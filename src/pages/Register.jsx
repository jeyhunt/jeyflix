import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import "animate.css";

import { useAuth } from "../contexts/authContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, errorMsg } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email required"),
      password: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
          "Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters"
        )
        .required("Password required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await signup(values.email, values.password);
      navigate("/home");
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className="bg-login">
      <div className="landing-navbar d-flex flex-row justify-content-between">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="landing-brand">Jeyflix</h1>
        </Link>
      </div>
      <div className="login-container">
        <Card
          className="kartu animate__animated animate__fadeInDown"
          style={{ height: "65%" }}
        >
          <h2 className="judul">Sign Up</h2>
          <div className="tengah d-flex flex-column align-items-center">
            <TextField
              id="filled-basic"
              fullWidth
              label="Email"
              variant="filled"
              margin="normal"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                backgroundColor: "#242526",
              }}
              InputLabelProps={{
                style: {
                  color: "#797979",
                },
              }}
              inputProps={{
                style: {
                  color: "#fff",
                },
              }}
            />
            <TextField
              id="filled-basic"
              fullWidth
              label="Password"
              variant="filled"
              margin="normal"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ color: "#797979" }} />
                      ) : (
                        <Visibility style={{ color: "#797979" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  color: "#fff",
                },
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                backgroundColor: "#242526",
              }}
              InputLabelProps={{
                style: {
                  color: "#797979",
                },
              }}
            />
            {loading ? (
              <CircularProgress style={{ color: "#fff", marginTop: "15px" }} />
            ) : (
              <Button className="login-butt" onClick={formik.handleSubmit}>
                Sign Up
              </Button>
            )}
          </div>
          <p className="text mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-link">
              Sign In Now.
            </Link>
          </p>
          {errorMsg ? (
            <div className="err-msg" style={{ textAlign: "center" }}>
              <p style={{ color: "#e50914" }}>
                {errorMsg ? errorMsg.slice(9) : null}
              </p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Register;
