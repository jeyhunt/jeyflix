import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import "animate.css";

import { useAuth } from "../contexts/authContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signin, errorMsg } = useAuth();
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
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await signin(values.email, values.password);
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
        <Card className="kartu animate__animated animate__fadeInDown">
          <h2 className="judul">Sign In</h2>
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
                Sign In
              </Button>
            )}
          </div>
          <p className="text mt-4">
            New to Jeyflix?{" "}
            <Link to="/register" className="text-link">
              Sign Up Now.
            </Link>
          </p>
          <div className="err-msg mt-2" style={{ textAlign: "center" }}>
            <p style={{ color: "#e50914" }}>
              {errorMsg ? errorMsg.slice(9) : null}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
