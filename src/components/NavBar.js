import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
  const [un, setUn] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const u = localStorage.getItem("un");
    setUn(u);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-brand">Thought Canvas</div>
      <div className="nav-links">
        <Link to="/all-blogs" className={location.pathname === "/all-blogs" ? "active" : ""}>All Blogs</Link>
        {un === null ? (
          <>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
            <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>SignUp</Link>
            <Link to="/forgot-password" className={location.pathname === "/forgot-password" ? "active" : ""}>Forgot Password</Link>
          </>
        ) : (
          <>
            <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Your Blogs</Link>
            <Link to="/create-blog" className={location.pathname === "/create-blog" ? "active" : ""}>Create Blog</Link>
            <Link to="/change-password" className={location.pathname === "/change-password" ? "active" : ""}>Change Password</Link>
            <button onClick={() => { localStorage.removeItem("un"); window.location.href = "/all-blogs"; }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;