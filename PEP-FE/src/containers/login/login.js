import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import "./login.scss";
import image from "../../images/loginVector.jpg";
import logo from "../../images/nineleapsLogo.png";
import GLogin from "../../components/google-login/googleLoginButton";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { SELFDASH, MAINDASH } from "../../globals/config/urlMappings";
import axiosInstance from "../../globals/services/axiosInterceptor";

const Login = () => {
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid Email or Password");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const pattern = new RegExp(/^([a-zA-Z0-9_\-.]+)@(nineleaps.com)$/);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (id !== "") {
      setErrors((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
    if (loginFail !== false) {
      setLoginFail(false);
    }
    if (errorMessage !== "Invalid Email or Password") {
      setErrorMessage("Invalid Email or Password");
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.email === "" || state.password === "") {
      if (state.email === "") {
        setErrors((prevState) => ({
          ...prevState,
          email: "Email cannot be empty",
        }));
      }
      if (state.password === "") {
        setErrors((prevState) => ({
          ...prevState,
          password: "Password cannot be empty",
        }));
      }
    } else if (!pattern.test(state.email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Enter your official work Email",
      }));
    } else {
      const payload = {
        email: state.email,
        password: state.password,
      };
      axiosInstance
        .post("users/auth", payload)
        .then((response) => {
          const accessToken = response.data.data.accessToken;
          const refreshToken = response.data.data.refreshToken;
          const user = jwt(accessToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          if (user.role === "employee") {
            history.push(SELFDASH);
          } else {
            history.push(MAINDASH);
          }
        })
        .catch(() => {
          setErrorMessage("Invalid Email or Password");
          setLoginFail(true);
        });
    }
  };

  return (
    <div className="login-page">
      <div className="container-fluid login-container">
        <div className="row">
          <div className="col-sm-6 col-md-7 col-lg-8 p-0 login-column">
            <img src={image} alt="" className="login-image" />
          </div>
          <div className="col-sm-6 col-md-5 col-lg-4 login-column">
            <br />
            <img src={logo} alt="" className="logo rounded mx-auto d-block" />
            <p className="portal-name or">Performance Evaluation Portal</p>
            <div className="login-form">
              {loginFail ? (
                <div
                  className="alert alert-danger login-error p-1"
                  role="alert"
                >
                  {errorMessage}
                </div>
              ) : null}
              <form>
                <div className="form-group input-block">
                  <label htmlFor="email">
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={state.email}
                    onChange={handleChange}
                  />
                  <div className="text-danger empty-error">{errors.email}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <div className="text-danger empty-error">
                    {errors.password}
                  </div>
                </div>
                <div className="bn text-center login-button">
                  <button
                    type="submit"
                    className="butn btn-outline"
                    onClick={handleSubmitClick}
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="or">or</p>
              <div className="bn text-center google-login">
                <GLogin
                  setLoginFail={setLoginFail}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
