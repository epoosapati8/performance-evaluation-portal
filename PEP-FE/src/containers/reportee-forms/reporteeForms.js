import React, { useState, useEffect } from "react";
import "./reporteeForms.scss";
import axiosInstance from "../../globals/services/axiosInterceptor";
import axios from "axios";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import SelfformRMRO from "../past-self-assessment/pastSelfAssessment.js";
import ScoreSheet from "../score-sheet/scoreSheet.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Emptypage from "../../components/empty-page/emptyPage";

const ReporteeForms = (props) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [dataFlag, setDataFlag] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const year = props.year;
  const quarter = props.quarter;
  const project = props.projects;
  const empId = props.empId;
  const empName = props.empName;

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(
          `/perfEvalAnswers/${empId}/${year}/${quarter}/${project}`
        ),
        axiosInstance.get(
          `/scoreSheetAnswers/${empId}/${year}/${quarter}/${project}`
        ),
      ])
      .then(
        axios.spread((selfeval, scoresheet) => {
          if (selfeval.status === 204 || scoresheet.status === 204) {
            if (scoresheet.status === 204) {
              axiosInstance
                .get(`/scoreSheetQues/${year}/${quarter}`)
                .then((response) => {
                  const ans = selfeval.data.data.answers;
                  const ques = selfeval.data.data.questions;
                  setQuestions(ques);
                  setAnswers(ans);
                  const data = response.data.data;
                  setScoreData(data);
                  setDataFlag(false);
                  setLoading(false);
                })
                .catch(() => {
                  setLoading(false);
                });
            }
            setLoading(false);
          } else {
            const ans = selfeval.data.data.answers;
            const ques = selfeval.data.data.questions;
            setQuestions(ques);
            setAnswers(ans);
            const data = scoresheet.data.data;
            setScoreData(data);
            setLoading(false);
            setDataFlag(false);
          }
        })
      )
      .catch(() => {
        setLoading(false);
      });
  }, [year, quarter, empId, project]);

  return isLoading ? (
    <LoaderPage />
  ) : dataFlag ? (
    <Emptypage />
  ) : (
    <div className="reportee-forms-page">
      <Header />
      <Sidenav />
      <div className="container-fluid reportee-form-container">
        <div className="row reportee-name">
          <div className="col-sm-12 col-md-12 col-lg-10 offset-md-2 reportee-name-column">
            <label className="label-primary">Employee Name: {empName}</label>
          </div>
        </div>
        <div className="row reportee-form">
          <div className="col-sm-6 col-md-6 col-lg-6 p-0 self-assessment">
            <p className="h3 self-assessment-heading">Self Assessment Form</p>

            <SelfformRMRO questions={questions} answers={answers} />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 p-0 score-sheet">
            <p className="h3 score-sheet-heading">Score Sheet</p>
            <p className="h6 disclaimer">
              (Rate the following parameters out of 25)
            </p>

            <ScoreSheet
              data={scoreData}
              year={year}
              quarter={quarter}
              project={project}
              empId={empId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporteeForms;
