import React from "react";
import "./404Page.scss";
import image from "../../images/404.jpg";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="container-fluid page-container">
        <div className="image-container">
          <img src={image} alt="" className="image404 center" />
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
