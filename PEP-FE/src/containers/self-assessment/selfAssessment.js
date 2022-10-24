import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import axiosInstance from "../../globals/services/axiosInterceptor";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import EmptyPage from "../../components/empty-page/emptyPage";
import "./selfAssessment.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelfAssessment = (props) => {
  const year = props.year;
  const quarter = props.quarter;
  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/projects/${year}/${quarter}`),
        axiosInstance.get(`/selfEvalQues/${year}/${quarter}`),
      ])
      .then(
        axios.spread((projects, selfevalques) => {
          const projList = projects.data.data;
          setProject(projList[0]);
          setProjects(projList);
          const ques = selfevalques.data.data.questions;
          if (ques.length === 0 || projList.length === 0) {
            setLoading(false);
          } else {
            for (let id = 0; id < ques.length; id++) {
              setData((prevState) => ({
                ...prevState,
                [id]: "",
              }));
              setError((prevState) => ({
                ...prevState,
                [id]: "",
              }));
            }
            setQuestions(ques);
            setDataFlag(false);
            setLoading(false);
          }
        })
      )
      .catch(() => {
        setLoading(false);
      });
  }, [year, quarter]);

  const [project, setProject] = useState("Project");
  const [questions, setQuestions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [ansData, setData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataFlag, setDataFlag] = useState(true);

  const user = jwt(localStorage.getItem("accessToken"));

  const handleSelect = (e) => {
    setProject(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (value.match(/^(?!\s)[\w\s-]*$/) == null) {
      setError((prevState) => ({
        ...prevState,
        [id]: "Enter valid data",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    for (let i = 0; i < questions.length; i++) {
      if (error[i] !== "") {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      const answers = questions.map((data, id) => {
        let ans = ansData[id];
        setData((prevState) => ({
          ...prevState,
          [id]: "",
        }));
        return ans;
      });
      const payload = {
        email: user.email,
        empId: user.empId,
        year,
        quarter,
        answers,
        projectName: project,
      };
      axiosInstance
        .post("/perfEvalAnswers", payload)
        .then((response) => {
          const temp = projects;
          const index = temp.indexOf(project);
          if (index > -1) {
            temp.splice(index, 1);
          }
          setProject(temp[0]);
          setProjects(temp);
          toast.success("Submission successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Submission Failed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } else {
      toast.error("Submission Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const projectList = projects.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });

  let questionsList = questions
    .sort((a, b) =>
      a.displayOrder.localeCompare(b.displayOrder, "en-u-kn-true")
    )
    .map((data, id) => {
      const Question = `Ques-${id}`;
      return (
        <div key={Question} className="container form-container">
          <div className="form-group form-group-self">
            <label htmlFor={id}>
              <b>{data.question}</b>
              {data.mandatory ? <div className="required">*</div> : null}
            </label>
            <textarea
              type="text"
              className="form-control form-control-self"
              id={id}
              value={ansData[id]}
              pattern="[A-Za-z0-9]"
              placeholder="Enter your response"
              onChange={handleChange}
              required={data.mandatory}
            ></textarea>
            <div className="text-danger valid-input-error">{error[id]}</div>
          </div>
        </div>
      );
    });

  return isLoading ? (
    <LoaderPage />
  ) : dataFlag ? (
    <EmptyPage />
  ) : (
    <div className="self-assessment-page">
      <div className="self-assessment-header">
        <Header />
        <Sidenav />
        <br></br>
      </div>

      <div className="container heading-container">
        <div className="col-sm-12 col-md-8 col-lg-8 self-assessment-heading">
          <p className="h3 heading">Self Assessment Form</p>
          <DropdownButton
            menuAlign="right"
            className="dropdown project"
            id="dropdown-menu-align-left"
            title={project}
            onSelect={handleSelect}
          >
            {projectList}
          </DropdownButton>
        </div>
      </div>
      <br></br>

      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="container form-container">
          <div className="col-sm-12 col-md-8 col-lg-8 main">
            <p className="h6 not-applicable">
              * For questions not applicable, input NA. *
            </p>

            {questionsList}
          </div>
        </div>

        <div className="mt-5 text-center Submit">
          <button type="submit" className="btn-secondary submit-button">
            Submit
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default SelfAssessment;
