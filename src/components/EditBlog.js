// EditBlog.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { encodeEmail } from "./utils";

function EditBlog() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const { blogId } = useParams();
  const un = localStorage.getItem("un");

  useEffect(() => {
    if (un && blogId) {
      const encodedUn = encodeEmail(un);
      const blogRef = ref(db, `blogs/${encodedUn}/${blogId}`);
      get(blogRef).then((snapshot) => {
        if (snapshot.exists()) {
          const blogData = snapshot.val();
          setTitle(blogData.title);
          setAuthorName(blogData.authorName);
          setContent(blogData.content);
        } else {
          console.log("No such blog!");
          nav("/home");
        }
      }).catch((error) => {
        console.error("Error fetching blog: ", error);
      });
    }
  }, [un, blogId, nav]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedUn = encodeEmail(un);
    const blogRef = ref(db, `blogs/${encodedUn}/${blogId}`);
    update(blogRef, {
      title,
      authorName,
      content,
      date: new Date().toISOString(),
    }).then(() => {
      nav("/home");
    }).catch((error) => {
      console.error("Error updating blog: ", error);
    });
  };

  if (!un) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="center">
        <div className="create-blog-form">
          <h1>Edit Blog</h1>
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
            <input type="submit" value="Update Blog" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditBlog;