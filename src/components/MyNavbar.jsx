import React, { useEffect, useState } from "react";
import "../styles/MyNavbar.css";
import ppNetflix from "../assets/ppnetflix.jpeg";
import { useAuth } from "../contexts/authContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const [show, handleShow] = useState(false);
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();

  const signOutBtn = () => {
    signout();
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", function listener() {
      if (window.scrollY > 200) {
        handleShow(true);
      } else handleShow(false);

      return () => {
        window.removeEventListener("scroll", listener);
      };
    });
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <h1 className="brand">Jeyflix</h1>
      <div className="dropdown">
        <img src={ppNetflix} alt="avatar" className="avatar" />
        <div className="dropdown-content">
          <p className="user">{currentUser && currentUser.email}</p>
          <Button variant="link" className="logout-btn" onClick={signOutBtn}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
