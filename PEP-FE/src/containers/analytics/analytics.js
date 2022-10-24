import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../globals/services/axiosInterceptor";
import jwt from "jwt-decode";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Bar } from "react-chartjs-2";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./analytics.scss";
const Analytics = () => {
  const [isLoading, setLoading] = useState(false);
  const y = new Date().getFullYear();
  const [year, setYear] = useState(y);
  const [quarter, setQuarter] = useState("Q1");
  const [project, setProject] = useState("Project");
  const [designation, setDesignation] = useState("Role");
  const [projects, setProjects] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [disable, setDisable] = useState(true);
  const [yearDisable, setYearDisable] = useState(false);
  const [state, setState] = useState({
    range1: 0,
    range2: 0,
    range3: 0,
    range4: 0,
  });
  const quartersList = ["Q1", "Q2", "Q3", "Q4"];
  const user = jwt(localStorage.getItem("accessToken"));
  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`employees/year/${user.empId}`),
        axiosInstance.get(`designation`),
      ])
      .then(
        axios.spread((yearResponse, designationResponse) => {
          setDesignationList(designationResponse.data.data);
          const yearOfJoining = yearResponse.data.data;
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
      )
      .catch(() => {
        setYearDisable(true);
      });
  }, [user.empId]);

  useEffect(() => {
    setLoading(true);
    if (project === "Project") {
      setDisable(true);
      let url = "";
      if (user.role === "hrManager") {
        url = `/projects/${year}/${quarter}`;
      } else if (user.role === "hr") {
        url = `/projects/hr/${year}/${quarter}/${user.empId}`;
      } else {
        url = `/projects/${year}/${quarter}/${user.empId}`;
      }
      axiosInstance
        .get(url)
        .then((response) => {
          const projs = response.data.data;
          if (projs.length !== 0) {
            setProject(projs[0]);
            setDisable(false);
          }
          setProjects(projs);
        })
        .catch(() => {
          setDisable(true);
          setLoading(false);
        });
    } else {
      axios
        .all([
          isAll
            ? axiosInstance.get(
                `/projectsEmp/analysis/${year}/${quarter}/${project}`
              )
            : axiosInstance.get(
                `/projectsEmp/analysis/${year}/${quarter}/${project}/${designation}`
              ),
        ])
        .then(
          axios.spread((analysis) => {
            if (analysis.status === 204) {
              setLoading(false);
              setState({
                range1: 0,
                range2: 0,
                range3: 0,
                range4: 0,
              });
            } else {
              const empList = analysis.data.data;
              setEmployees(empList);
              setLoading(false);
              let temp = { r1: 0, r2: 0, r3: 0, r4: 0 };
              empList.forEach((data) => {
                if (data.total <= 50) {
                  ++temp.r1;
                } else if (data.total >= 51 && data.total <= 70) {
                  ++temp.r2;
                } else if (data.total >= 71 && data.total <= 90) {
                  ++temp.r3;
                } else {
                  ++temp.r4;
                }
              });
              setState({
                range1: temp.r1,
                range2: temp.r2,
                range3: temp.r3,
                range4: temp.r4,
              });
            }
          })
        )
        .catch(() => {
          setLoading(false);
        });
    }
  }, [project, quarter, year, user.empId, user.role, designation, isAll]);

  const handleProjectSelect = (e) => {
    setProject(e);
  };

  const handleSelect = (e) => {
    setYear(e);
    setProject("Project");
    setEmployees([]);
    setState({
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0,
    });
  };

  const handleClick = (e) => {
    setQuarter(e);
    setProject("Project");
    setEmployees([]);
    setState({
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0,
    });
  };

  const handleDesignationSelect = (e) => {
    setDesignation(e);
    if (e === "ALL") {
      setIsAll(true);
    } else {
      setIsAll(false);
      setEmployees();
    }
  };

  const years = yearsList.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  const quarters = quartersList.map((data, id) => {
    return (
      <Dropdown.Item className="quarter" key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  const projectList = projects.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  const designations = designationList.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  const barData = {
    labels: ["Less than 50", "51-70", "71-90", "Greater than 90"],
    datasets: [
      {
        label: "Employee scores",
        backgroundColor: "#64a1f4 " /*"#f6cd61 ", "#35a79c", "#fe8a71"*/,
        hoverBackgroundColor: "#64a1f4 ",
        borderWidth: 2,
        data: [state.range1, state.range2, state.range3, state.range4],
      },
    ],
  };

  return isLoading ? (
    <LoaderPage />
  ) : (
    <div className="analytics-page">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="container-fluid analytics-container">
        <div className="row analytics-row1">
          <div className="row analytics-row2">
            <p className="h3 analytics-heading">Analytics</p>
            <DropdownButton
              className="dropdown-year"
              id="dropdown-basic-button"
              title={year}
              disabled={yearDisable}
              onSelect={handleSelect}
            >
              {years}
            </DropdownButton>
            <DropdownButton
              className="dropdown-quarter"
              id="dropdown-basic-button-2"
              title={quarter}
              onSelect={handleClick}
            >
              {quarters}
            </DropdownButton>
            <DropdownButton
              menuAlign="right"
              className="dropdown-project"
              id="dropdown-menu-align-left"
              title={project}
              disabled={disable}
              onSelect={handleProjectSelect}
            >
              {projectList}
            </DropdownButton>
            <DropdownButton
              menuAlign="right"
              className="dropdown-designation"
              id="dropdown-menu-align-left"
              title={designation}
              onSelect={handleDesignationSelect}
            >
              {designations}
            </DropdownButton>
          </div>
          <br></br>
        </div>
        <div className="row justify-content-md-center table-center">
          <div className="col-sm-8 col-md-8 col-lg-8 p-0 csv">
            <div className="table">
              <BootstrapTable
                className="table-component"
                data={employees}
                options={{
                  noDataText: "No Record Found",
                  defaultSortName: "total",
                  defaultSortOrder: "desc",
                  // noAutoBOM: false,
                }}
                hover={true}
                bordered={false}
                search
                exportCSV
                csvFileName={`${project}-${year}-${quarter}-report.csv`}
              >
                <TableHeaderColumn
                  dataField="empId"
                  csvHeader="Id"
                  isKey={true}
                  dataAlign="center"
                  headerAlign="center"
                  dataSort={true}
                  width="10%"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none", wordWrap: "anywhere" }}
                >
                  Id
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="empName"
                  csvHeader="Name"
                  dataAlign="center"
                  headerAlign="center"
                  dataSort={true}
                  width="20%"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none", wordWrap: "anywhere" }}
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="empRole"
                  csvHeader="Role"
                  dataAlign="center"
                  headerAlign="center"
                  width="10%"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none", wordWrap: "anywhere" }}
                >
                  Role
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="total"
                  csvHeader="Score"
                  dataAlign="center"
                  headerAlign="center"
                  dataSort={true}
                  width="10%"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none", wordWrap: "anywhere" }}
                >
                  Score
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="emailId"
                  csvHeader="Email Id"
                  dataAlign="center"
                  width="20%"
                  expandable={true}
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none", wordWrap: "anywhere" }}
                >
                  Email
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
            <div className="chart">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <Bar
                  data={barData}
                  height={350}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
