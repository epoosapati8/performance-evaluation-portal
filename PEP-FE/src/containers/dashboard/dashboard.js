import React from "react";
import "./dashboard.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/header";
import Sidenav from "../../components/side-bar/sideBar";
import img from "../../images/reporteeManagement.jpg";
import picture from "../../images/performanceEvaluation.jpg";
import { useHistory } from "react-router-dom";
import { SELFDASH, RMDASH } from "../../globals/config/urlMappings";
const Dashboard = () => {
  const history = useHistory();

  return (
    <div className="dashboard">
      <header>
        <Header />
      </header>
      <div className="container-fluid main-container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 p-0 side-nav">
            <Sidenav />
          </div>
          <div className="col-xs-4 col-sm-8 col-md-12 col-lg-8 dashboard-column">
            <div className="row dashboard-row">
              <div className="col-xs-4 col-sm-8 col-md-6 col-lg-6 main-column">
                <div className="card">
                  <img className="card-img-top" src={picture} alt="img" />
                  <div className="card-body card-button">
                    <button
                      type="button"
                      className="btn b stretched-link button"
                      onClick={() => {
                        history.push(SELFDASH);
                      }}
                    >
                      Performance Evaluation
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xs-4 col-sm-8 col-md-6 col-lg-6 main-column">
                <div className="card">
                  <img className="card-img-top" src={img} alt="img" />
                  <div className="card-body card-button">
                    <button
                      type="button"
                      className="btn b stretched-link button"
                      onClick={() => {
                        history.push(RMDASH);
                      }}
                    >
                      Reportee Management
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
