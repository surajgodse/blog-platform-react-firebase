// Home.js
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { encodeEmail } from "./utils";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const un = localStorage.getItem("un");

  useEffect(() => {
    if (un) {
      const encodedUn = encodeEmail(un);
      const userBlogRef = ref(db, `blogs/${encodedUn}`);
      onValue(userBlogRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const userBlogs = Object.entries(data).map(([id, blog]) => ({
            id,
            ...blog
          }));
          setBlogs(userBlogs);
        } else {
          setBlogs([]);
        }
      });
    }
  }, [un]);

  if (!un) {
    return <Navigate to="/login" />;
  }

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const encodedUn = encodeEmail(un);
      const blogRef = ref(db, `blogs/${encodedUn}/${blogId}`);
      remove(blogRef).then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      }).catch(error => {
        console.error("Error deleting blog: ", error);
      });
    }
  };

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="blog-list">
          <h1>Your Blogs</h1>
          {blogs.length === 0 ? (
            <h2>You haven't posted any blogs yet</h2>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-summary">
                <h2>{blog.title}</h2>
                <p>By: {blog.authorName} on {new Date(blog.date).toLocaleDateString()}</p>
                <p>{blog.content.substring(0, 100)}...</p>
                <Link to={`/blog/${encodeEmail(un)}/${blog.id}`} className="read-more-btn">Read More</Link>
                <Link to={`/edit-blog/${blog.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(blog.id)} className="delete-btn">Delete</button>
              </div>
            ))
          )}
          <Link to="/create-blog" className="create-blog-btn">Create New Blog</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;