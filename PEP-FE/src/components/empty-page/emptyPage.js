import React from "react";
import "./emptyPage.scss";
import img from "../../images/noDataFound.png";
import Header from "../header/header.js";
import Sidenav from "../side-bar/sideBar.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

const EmptyPage = (props) => {
  const history = useHistory();
  return (
    <div className="no-data-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="container-fluid no-data-container">
        <div className="col-sm-12 col-md-6 col-lg-6 offset-md-6 image-column">
          <img src={img} alt="NoDatafound" className="image" />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 offset-md-4 message">
          <p>{props.message}</p>
          <p className="custom-p" onClick={history.goBack}>
            Let's go back.
          </p>
        </div>
      </div>
    </div>
  );
};
export default EmptyPage;
