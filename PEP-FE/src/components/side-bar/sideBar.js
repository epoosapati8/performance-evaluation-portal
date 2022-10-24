import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import jwt from "jwt-decode";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.scss";
import {
  SELFDASH,
  RMDASH,
  PROFILE,
  SETTINGS,
  REPORT,
  ANALYTICS,
  POSTQUESTIONS,
} from "../../globals/config/urlMappings";

const SideBar = () => {
  const history = useHistory();
  let display = true;
  const user = jwt(localStorage.getItem("accessToken"));
  if (user.role === "employee") {
    display = false;
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history.push("/");
  };

  const sidenav = () => {
    return (
      <div>
        <Nav.Link className="performance-evaluation" id="anc" href={SELFDASH}>
          Performance Evaluation
        </Nav.Link>
        {display ? (
          <Nav.Link className="reportee-management" id="anc" href={RMDASH}>
            Reportee Management
          </Nav.Link>
        ) : null}
        <Nav.Link className="profile" id="anc" href={PROFILE}>
          Profile
        </Nav.Link>
        {display ? (
          <Nav.Link className="analytics" id="anc" href={ANALYTICS}>
            Analytics
          </Nav.Link>
        ) : null}
        {user.role === "hrManager" ? (
          <div>
            <Nav.Link className="post-questions" id="anc" href={POSTQUESTIONS}>
              Post Questions
            </Nav.Link>
          </div>
        ) : null}
        <div className="footer">
          <Nav.Link className="settings" id="anc" href={SETTINGS}>
            Change Password
          </Nav.Link>
          <Nav.Link className="report" id="anc" href={REPORT}>
            Report A Bug
          </Nav.Link>
          <Nav.Link className="logout" onClick={logout}>
            Logout
          </Nav.Link>
        </div>
      </div>
    );
  };

  return (
    <div className="side-nav-bar">
      <div className="hamburger">
        <div className="d-lg-none d-md-none">
          {/* <span class="text-muted">Search Filters</span> */}
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">{sidenav()}</Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <div
        id="sidebar"
        className="collapse d-lg-block d-md-block list-group col-xs-12 col-sm-12 col-md-12 col-lg-12 side-bar"
      >
        {sidenav()}
      </div>
    </div>
  );
};
export default SideBar;
