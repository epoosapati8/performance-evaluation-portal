import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";
import "./performanceEvaluation.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/header";
import Sidenav from "../../components/side-bar/sideBar";
import img from "../../images/quarters.jpg";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { SELFEVALFORMS } from "../../globals/config/urlMappings";
import axiosInstance from "../../globals/services/axiosInterceptor";
const PerformanceEvaluation = () => {
  const history = useHistory();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [yearsList, setYearsList] = useState([]);
  const [yearDisable, setYearDisable] = useState(false);
  const handleSelect = (e) => {
    setYear(e);
  };
  useEffect(() => {
    const user = jwt(localStorage.getItem("accessToken"));
    axiosInstance
      .get(`employees/year/${user.empId}`)
      .then((response) => {
        const yearOfJoining = response.data.data;
        let years = [];
        for (
          let i = parseInt(new Date().getFullYear().toString());
          i >= parseInt(yearOfJoining);
          i--
        ) {
          years.push(i.toString());
        }
        setYearsList(years);
      })
      .catch(() => {
        setYearDisable(true);
      });
  }, []);
  const QUARTERS = [
    {
      quarter: "Q1",
      imageSource: { img },
    },
    {
      quarter: "Q2",
      imageSource: { img },
    },
    {
      quarter: "Q3",
      imageSource: { img },
    },
    {
      quarter: "Q4",
      imageSource: { img },
    },
  ];
  const years = yearsList.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });
  const Card = (props) => {
    return (
      <div className="card">
        <img className="card-img-top" src={props.headerImage} alt="img" />
        <div className="card-body">
          <button
            type="button"
            className="btn b stretched-link card-button"
            onClick={() =>
              history.push(
                SELFEVALFORMS.replace(":year", year).replace(
                  ":quarter",
                  props.quarter
                )
              )
            }
          >
            {props.quarter}
          </button>
        </div>
      </div>
    );
  };
  let CardList = QUARTERS.map((quarter) => (
    <Card
      headerImage={img}
      overrides={{
        Root: {
          style: { maxWidth: "280px", justifySelf: "center" },
        },
      }}
      quarter={quarter.quarter}
    ></Card>
  ));
  return (
    <div className="performance-evaluation-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="container-fluid performance-evaluation-container">
        <div className="heading">
          <p className="h3 heading-content">Performance Evaluation</p>
          <DropdownButton
            className="dropdown-year"
            id="dropdown-basic-button"
            title={year}
            disabled={yearDisable}
            onSelect={handleSelect}
          >
            {years}
          </DropdownButton>
        </div>
        <br></br>
        <div className="row card-row1">
          <div className="w-25 card-column1">{CardList[0]}</div>
          <div className="w-25 card-column2">{CardList[1]}</div>
        </div>
        <div className="row card-row2">
          <div className="w-25 card-column1">{CardList[2]}</div>
          <div className="w-25 card-column2">{CardList[3]}</div>
        </div>
      </div>
    </div>
  );
};
export default PerformanceEvaluation;
