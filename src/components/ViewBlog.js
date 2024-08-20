import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "./Firebase";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

function ViewBlog() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const blogRef = ref(db, `blogs/${id}`);
    get(blogRef).then((snapshot) => {
      if (snapshot.exists()) {
        setBlog(snapshot.val());
      }
    });
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="center">
        {blog ? (
          <>
            <h1>{blog.title}</h1>
            <p>By: {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            <p>{blog.content}</p>
          </>
        ) : (
          <p>Blog not found</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ViewBlog;
