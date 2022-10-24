import React from "react";
import "./header.scss";
import jwt from "jwt-decode";
import { SELFDASH, MAINDASH } from "../../globals/config/urlMappings";
import Sidenav from "../../components/side-bar/sideBar.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
  let HomeUrl = MAINDASH;
  const user = jwt(localStorage.getItem("accessToken"));
  if (user.role === "employee") {
    HomeUrl = SELFDASH;
  }
  return (
    <div className="header-component">
      <div className="container">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <nav className="navbar navbar-expand-lg static-top  header">
            <a className="navbar-brand" href={HomeUrl}>
              {/* <Sidenav /> */}
              <img
                src="https://www.nineleaps.com/wp-content/themes/nineleaps/assets/img/nineleaps-logo-footer.svg"
                alt="Logo"
                className="logo"
              />
            </a>
            <div className="header-right">Hello, {user.name}</div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Header;
