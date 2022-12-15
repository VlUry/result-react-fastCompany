import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const linkStyle = (path) => {
    return "nav-link " + (location.pathname === path ? "active" : "");
  };

  return (
    <nav className="nav nav-pills m-2">
      <Link to="/" className={linkStyle("/")}>
        Home
      </Link>
      <Link to="/login" className={linkStyle("/login")}>
        Login
      </Link>
      <Link to="/users" className={linkStyle("/users")}>
        Users
      </Link>
    </nav>
  );
};

export default Navigation;
