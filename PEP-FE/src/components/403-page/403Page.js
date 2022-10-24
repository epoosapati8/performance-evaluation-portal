import React from "react";
import "./403Page.scss";
import image from "../../images/403.png";

const ForbiddenPage = () => {
  return (
    <div className="forbidden-page">
      <div className="container-fluid page-container">
        <div className="image-container">
          <img src={image} alt="" className="image404 center" />
          <div className="message">
            You are not authorised to access this page.
            <p className="custom-p">
              Let's go <a href="/">home</a> and try from there.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForbiddenPage;
