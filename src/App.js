// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AllBlogs from './components/AllBlogs';
import Home from './components/Home';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import BlogDetails from './components/BlogDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:blogId" element={<EditBlog />} />
        <Route path="/blog/:userId/:blogId" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate replace to="/all-blogs" />} />
      </Routes>
    </Router>
  );
}

export default App;