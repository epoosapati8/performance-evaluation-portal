import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axiosInstance from "../../globals/services/axiosInterceptor";
import Header from "../../components/header/header.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import Sidenav from "../../components/side-bar/sideBar.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./profile.scss";
const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const user = jwt(localStorage.getItem("accessToken"));
  useEffect(() => {
    axiosInstance
      .get(`employees/profile/${user.empId}`)
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user.empId]);
  return isLoading ? (
    <LoaderPage />
  ) : (
    <div className="profile-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="container profile-container">
        <div className="col-sm-8 col-md-10 col-lg-10">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="col-sm-4 col-md-10 col-lg-10 offset-md-2 profile-heading">
                Profile
              </h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-10 offset-md-2">
                  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{userData.name}</td>
                      </tr>
                      <tr>
                        <td>Employee ID</td>
                        <td>{userData.empId}</td>
                      </tr>
                      <tr>
                        <td>Designation</td>
                        <td>{userData.designation}</td>
                      </tr>
                      <tr>
                        <td>Year Of Joining</td>
                        <td>{userData.yearOfJoining}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
