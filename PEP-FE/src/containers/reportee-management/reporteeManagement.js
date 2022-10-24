import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import axiosInstance from "../../globals/services/axiosInterceptor";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { RMFORM } from "../../globals/config/urlMappings";
import "./reporteeManagement.scss";

const ReporteeManagement = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const y = new Date().getFullYear();
  const [year, setYear] = useState(y);
  const [quarter, setQuarter] = useState("Q1");
  const [project, setProject] = useState("Project");
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [disable, setDisable] = useState(true);
  const [yearDisable, setYearDisable] = useState(false);
  const quartersList = ["Q1", "Q2", "Q3", "Q4"];
  const user = jwt(localStorage.getItem("accessToken"));

  useEffect(() => {
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
      axiosInstance
        .get(`/projectsEmp/${year}/${quarter}/${project}`)
        .then((response) => {
          if (response.status === 204) {
          } else {
            const empList = response.data.data;
            setEmployees(empList);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [project, quarter, year, user.empId, user.role]);
  const handleProjectSelect = (e) => {
    setProject(e);
  };
  const handleSelect = (e) => {
    setYear(e);
    setProject("Project");
    setEmployees([]);
  };
  const handleClick = (e) => {
    setQuarter(e);
    setEmployees([]);
    setProject("Project");
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

  let projectList = projects.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  const options = {
    onRowClick: (props) => {
      history.push(
        RMFORM.replace(":empId", props.empId)
          .replace(":empName", props.empName)
          .replace(":year", year)
          .replace(":quarter", quarter)
          .replace(":project", project)
      );
    },
    noDataText: "No Record Found",
    defaultSortName: "empName",
    defaultSortOrder: "asc",
  };
  return isLoading ? (
    <LoaderPage />
  ) : (
    <div className="reportee-management">
      <header>
        <Header />
      </header>
      <div className="side-nav">
        <Sidenav />
      </div>
      <div className="container-fluid reportee-management-container">
        <div className="row table-row">
          <div className="row reportee-management-row">
            <p className="h3 heading">Reportee Management</p>
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
          </div>
          <br></br>
        </div>
        <div className="row justify-content-md-center table-center">
          <div className="col-sm-8 col-md-8 col-lg-8 p-0">
            <div className="table">
              <BootstrapTable
                className="table-component"
                data={employees}
                hover={true}
                bordered={false}
                options={options}
                search
              >
                <TableHeaderColumn
                  dataField="empId"
                  isKey={true}
                  dataAlign="center"
                  dataSort={true}
                  width="200"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none" }}
                >
                  Employee Id
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="empName"
                  dataAlign="center"
                  dataSort={true}
                  width="200"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none" }}
                >
                  Employee Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataAlign="center"
                  dataField="empRole"
                  width="200"
                  thStyle={{ color: "white" }}
                  tdStyle={{ outline: "none" }}
                >
                  Employee Role
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReporteeManagement;
