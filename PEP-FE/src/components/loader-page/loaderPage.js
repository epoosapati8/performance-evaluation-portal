import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./loaderPage.scss";

const LoaderPage = () => {
  return (
    <div className="load">
      <p className="wait">Your page is loading</p>
      <BeatLoader color="#005b96" loading={true} size={25} margin={8} />
    </div>
  );
};
export default LoaderPage;
