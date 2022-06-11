import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
import "../styles/Landing.css";

const Landing = () => {
  let navigate = useNavigate();

  const btnHandler = () => {
    navigate("/register");
  };

  return (
    <div className="bg">
      <LandingNavbar />
      <div className="landing-container">
        <div className="page-title">
          <h2 className="title-head">Unlimited movies, TV shows, and more.</h2>
          <h4 className="sub-title">Watch anywhere. Cancel anytime.</h4>
          <p className="isi">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <span>
            <input
              type="text"
              className="email"
              placeholder="Email address"
              name="email"
            />
            <input
              type="button"
              value="GET STARTED"
              className="email-btn"
              onClick={btnHandler}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
