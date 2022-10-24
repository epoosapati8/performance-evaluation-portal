import React, { useState } from "react";
import axiosInstance from "../../globals/services/axiosInterceptor";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../settings/settings.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const pattern = new RegExp(/^(?!.* )/);
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.oldPassword === "" ||
      state.newPassword === "" ||
      state.confirmNewPassword === ""
    ) {
      if (state.oldPassword === "") {
        setErrors((prevState) => ({
          ...prevState,
          oldPassword: "Password cannot be empty",
        }));
      }
      if (state.newPassword === "") {
        setErrors((prevState) => ({
          ...prevState,
          newPassword: "Password cannot be empty",
        }));
      }
      if (state.confirmNewPassword === "") {
        setErrors((prevState) => ({
          ...prevState,
          confirmNewPassword: "Password cannot be empty",
        }));
      }
    } else if (
      !pattern.test(state.oldPassword) ||
      !pattern.test(state.newPassword) ||
      !pattern.test(state.confirmNewPassword)
    ) {
      if (state.oldPassword.match(/^(?!.* )/) == null) {
        setErrors((prevState) => ({
          ...prevState,
          oldPassword: "Password cannot have whitespaces",
        }));
      }
      if (state.newPassword.match(/^(?!.* )/) == null) {
        setErrors((prevState) => ({
          ...prevState,
          newPassword: "Password cannot have whitespaces",
        }));
      }
      if (state.confirmNewPassword.match(/^(?!.* )/) == null) {
        setErrors((prevState) => ({
          ...prevState,
          confirmNewPassword: "Password cannot have whitespaces",
        }));
      }
    } else if (state.oldPassword === state.newPassword) {
      setErrors((prevState) => ({
        ...prevState,
        newPassword: "Old Password and new password cannot be same",
      }));
    } else if (state.newPassword !== state.confirmNewPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmNewPassword: "Passwords don't match",
      }));
    } else {
      const payload = {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      };
      axiosInstance
        .post("users/change-password", payload)
        .then((response) => {
          setState({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          toast.success("Submission successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Invalid Old Password", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };
  return (
    <div className="settings-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div>
        <div className="container settings-container">
          <div className="col-sm-8 col-md-10 col-lg-10">
            <div className="justify-content-between align-items-center mb-3">
              <h3 className="col-sm-12 col-md-10 col-lg-10 offset-md-2 settings-heading">
                Change Password
              </h3>
            </div>
            <div className="form1">
              <form
                className="col-sm-12 col-md-10 col-lg-10 offset-md-2"
                onSubmit={handleSubmit}
              >
                <div className="settings-column">
                  <label className="labels">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="form-control settings-fields"
                    placeholder="Enter your old password"
                    value={state.oldPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-danger empty-error">
                  {errors.oldPassword}
                </div>
                <div className="settings-column">
                  <label className="labels">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control settings-fields"
                    placeholder="Enter your new password"
                    value={state.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-danger empty-error">
                  {errors.newPassword}
                </div>
                <div className="settings-column">
                  <label className="labels">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    className="form-control settings-fields"
                    placeholder="Enter your new password again"
                    value={state.confirmNewPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-danger empty-error">
                  {errors.confirmNewPassword}
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary settings-button"
                    type="submit"
                  >
                    Submit
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
