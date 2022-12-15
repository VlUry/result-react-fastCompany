import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [activeLink, setActiveLink] = useState();

  const linkStyle = (link) => {
    return "nav-link " + (activeLink === link ? "active" : "");
  };

  return (
    <nav className="nav nav-pills m-2">
      <Link
        to="/"
        className={linkStyle("home")}
        onClick={() => setActiveLink("home")}
      >
        Home
      </Link>
      <Link
        to="/login"
        className={linkStyle("login")}
        onClick={() => setActiveLink("login")}
      >
        Login
      </Link>
      <Link
        to="/users"
        className={linkStyle("users")}
        onClick={() => setActiveLink("users")}
      >
        Users
      </Link>
    </nav>
  );
};

export default Navigation;
