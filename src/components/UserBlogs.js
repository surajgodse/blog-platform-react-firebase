import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const un = localStorage.getItem("un");

  useEffect(() => {
    const blogRef = ref(db, "blogs/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBlogs(Object.values(data).filter(blog => blog.author === un));
      } else {
        setBlogs([]);
      }
    });
  }, [un]);

  return (
    <>
      <NavBar />
      <div className="center">
        {blogs.length === 0 ? (
          <h2>You have not posted any blogs yet</h2>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} className="blog-summary">
              <h2>{blog.title}</h2>
              <p>By: {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
              <p>{blog.content.substring(0, 100)}...</p>
              <Link to={`/blog/${blog.id}`}>View Blog</Link>
            </div>
          ))
        )}
        <Link to="/create-blog">Create New Blog</Link>
      </div>
      <Footer />
    </>
  );
}

export default UserBlogs;
