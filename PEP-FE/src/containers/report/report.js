import React, { useState } from "react";
import jwt from "jwt-decode";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./report.scss";
import axiosInstance from "../../globals/services/axiosInterceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Report = () => {
  const [page, setPage] = useState("");
  const [description, setDescription] = useState("");
  const user = jwt(localStorage.getItem("accessToken"));
  const handlePage = (e) => {
    const { value } = e.target;
    setPage(value);
  };
  const handleInput = (e) => {
    const { value } = e.target;
    setDescription(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      empId: user.empId,
      email: user.email,
      page: page,
      description: description,
    };
    setPage("");
    setDescription("");
    axiosInstance
      .post("/reportABug/", payload)
      .then(() => {
        toast.success("Submission Successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => {
        toast.error("Submission Failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  return (
    <div className="report-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="report">
        <div className="container report-container">
          <div className="col-sm-8 col-md-10 col-lg-10">
            <div className="justify-content-between align-items-center mb-3 report-form">
              <h3 className="col-sm-12 col-md-10 col-lg-10 offset-md-2 report-heading">
                Report A Bug
              </h3>
            </div>
            <div className="form1">
              <form
                className="col-sm-12 col-md-10 col-lg-10 offset-md-2"
                onSubmit={handleSubmit}
              >
                <div className="report-column">
                  <label className="labels">Page</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your text"
                    onInput={handlePage}
                    value={page}
                    required
                  />
                </div>
                <div className="report-column">
                  <label className="labels">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter your text"
                    onInput={handleInput}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div className="mt-5 text-center">
                  <div>
                    <button
                      className="btn btn-primary report-button"
                      type="submit"
                    >
                      Submit
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Report;
