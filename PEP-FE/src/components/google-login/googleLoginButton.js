import React from "react";
import { useHistory } from "react-router-dom";
import "./googleLoginButton.scss";
import { useGoogleLogin } from "react-google-login";
import jwt from "jwt-decode";
import axiosInstance from "../../globals/services/axiosInterceptor";
import { SELFDASH, MAINDASH } from "../../globals/config/urlMappings";

const clientId =
  "1023412372144-26184u9qlrsh4qome0hgu7k39ric744k.apps.googleusercontent.com";

const GoogleLoginButton = (props) => {
  const history = useHistory();
  const onSuccess = (res) => {
    axiosInstance
      .post("/users/gauth", {
        tokenId: res.tokenId,
      })
      .then((response) => {
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const user = jwt(accessToken);
        if (user.role === "employee") {
          history.push(SELFDASH);
        } else {
          history.push(MAINDASH);
        }
      })
      .catch(() => {
        props.setErrorMessage("Google Login Failed");
        props.setLoginFail(true);
      });
  };

  const onFailure = (res) => {
    props.setErrorMessage("Google Login Failed");
    props.setLoginFail(true);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: "offline",
  });

  return (
    <div className="google-login-button">
      <button onClick={signIn} className="google-btn">
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </div>
        <p className="btn-text">Continue with Google</p>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
