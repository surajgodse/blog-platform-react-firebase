import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { encodeEmail } from "./utils";

function BlogDetails() {
  const { userId, blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const encodedUserId = encodeEmail(userId);
    const blogRef = ref(db, `blogs/${encodedUserId}/${blogId}`);
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBlog({ id: blogId, ...data });
      }
    });
  }, [userId, blogId]);

  if (!blog) {
    return (
      <div className="content-wrapper">
        <NavBar />
        <div className="center">
          <h2>Blog not found</h2>
          <Link to="/all-blogs" className="back-to-blogs-btn">Back to All Blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="blog-details">
          <h1>{blog.title}</h1>
          <p>By: {blog.authorName} on {new Date(blog.date).toLocaleDateString()}</p>
          <p>{blog.content}</p>
          <Link to="/all-blogs" className="back-to-blogs-btn">Back to All Blogs</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogDetails;