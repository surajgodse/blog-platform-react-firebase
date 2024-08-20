import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { encodeEmail } from "./utils";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const un = localStorage.getItem("un");

  if (!un) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const encodedUn = encodeEmail(un);
    const blogRef = ref(db, `blogs/${encodedUn}`);
    const newBlog = {
      title,
      authorName,
      content,
      date: new Date().toISOString(),
    };
    push(blogRef, newBlog);
    nav("/home");
  };

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="create-blog-form">
          <h1>Create Blog</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
            <textarea
              placeholder="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <input type="submit" value="Post Blog" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateBlog;