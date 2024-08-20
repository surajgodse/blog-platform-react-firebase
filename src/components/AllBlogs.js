import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { decodeEmail } from "./utils";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const un = localStorage.getItem("un");

  useEffect(() => {
    const blogRef = ref(db, "blogs/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allBlogs = Object.entries(data).flatMap(([encodedUserId, userBlogs]) => 
          Object.entries(userBlogs).map(([blogId, blog]) => ({
            id: blogId,
            userId: decodeEmail(encodedUserId),
            ...blog
          }))
        );
        setBlogs(allBlogs);
      } else {
        setBlogs([]);
      }
    });
  }, []);

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="blog-list">
          <h1>All Blogs</h1>
          {!un && (
            <Link to="/login" className="post-own-blog-btn">Login to Post Your Own Blog</Link>
          )}
          {blogs.length === 0 ? (
            <h2>No blogs posted yet</h2>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-summary">
                <h2>{blog.title}</h2>
                <p>By: {blog.authorName} on {new Date(blog.date).toLocaleDateString()}</p>
                <p>{blog.content.substring(0, 100)}...</p>
                <Link to={`/blog/${blog.userId}/${blog.id}`} className="read-more-btn">Read More</Link>              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllBlogs;