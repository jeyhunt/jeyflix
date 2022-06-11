import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/LandingNavbar.css";

const LandingNavbar = () => {
  return (
    <div className="landing-navbar d-flex flex-row justify-content-between">
      <h1 className="landing-brand">Jeyflix</h1>
      <div className="landing-login">
        <select className="language me-3">
          <option value="english">English</option>
          <option value="indo">Bahasa Indonesia</option>
        </select>
        <Link to="/login">
          <Button className="login-btn">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
