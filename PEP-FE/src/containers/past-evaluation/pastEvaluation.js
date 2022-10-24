import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../globals/services/axiosInterceptor";
import "./pastEvaluation.scss";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import SelfformRO from "../past-self-assessment/pastSelfAssessment.js";
import ScoreSheetRO from "../past-score-sheet/pastScoreSheet.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import EmptyPage from "../../components/empty-page/emptyPage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import html2pdf from "html2pdf.js";

const PastEvaluation = (props) => {
  const [project, setProject] = useState(props.project);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [scoreData, setScoreData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [dataFlag, setDataFlag] = useState(true);

  const year = props.year;
  const quarter = props.quarter;
  const empId = props.empId;
  const empName = props.empName;

  useEffect(() => {
    setLoading(true);
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
            setLoading(false);
          } else {
            const ans = selfeval.data.data.answers;
            const ques = selfeval.data.data.questions;
            setQuestions(ques);
            setAnswers(ans);
            const scoreData = scoresheet.data.data;
            setScoreData(scoreData);
            setDataFlag(false);
            setLoading(false);
          }
        })
      )
      .catch(() => {
        setLoading(false);
      });
  }, [year, quarter, empId, project]);

  const handleSelect = (e) => {
    setProject(e);
  };

  const generatePdf = () => {
    const element = document.getElementById("mainform");
    const opt = {
      margin: 1,
      filename: `${empName}-${year}-${quarter}-${project}-report.pdf`,
      html2canvas: { scale: 2, scrollY: 0, y: -40 },
      jsPDF: {
        unit: "pt",
        format: "a2",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all"] },
    };
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then((pdfObject) => {
        const pageWidth =
          pdfObject.internal.pageSize.width ||
          pdfObject.internal.pageSize.getWidth();
        pdfObject.setPage(1);
        pdfObject.setFillColor(0, 91, 150);
        pdfObject.rect(0, 0, pageWidth, 30, "FD");
        pdfObject.setTextColor(255, 255, 255);
        pdfObject.text(
          `Employee Name: ${empName}\tYear: ${year}\tQuarter: ${quarter}\tProject: ${project}`,
          pageWidth / 2,
          20,
          "center"
        );
      })
      .save();
  };

  let dropItems = props.projects.map((data, id) => {
    return (
      <Dropdown.Item key={id} eventKey={data}>
        {data}
      </Dropdown.Item>
    );
  });
  return isLoading ? (
    <LoaderPage />
  ) : dataFlag ? (
    <EmptyPage />
  ) : (
    <div className="past-evaluation-page">
      <Header />
      <Sidenav />
      <div className="container-fluid past-evaluation-container">
        {props.disable ? null : (
          <div className="row employee-name">
            <div className="col-sm-12 col-md-12 col-lg-10 offset-md-2 employee-name-column">
              <label className="label-primary">Employee Name: {empName}</label>
            </div>
          </div>
        )}

        <div className="row form-row" id="mainform">
          <div className="col-sm-6 col-md-6 col-lg-6 p-0">
            <p className="h3 self-assessment-heading">Self Assessment Form</p>
            <SelfformRO questions={questions} answers={answers} />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 p-0">
            <p className="h3 score-sheet-heading">Score Sheet</p>
            <DropdownButton
              menuAlign="right"
              className="dropdown project"
              id="dropdown-menu-align-left"
              title={project}
              onSelect={handleSelect}
              data-html2canvas-ignore="true"
            >
              {dropItems}
            </DropdownButton>

            <ScoreSheetRO data={scoreData} />
            <div
              className="mt-5 text-center"
              id="element-to-hide"
              data-html2canvas-ignore="true"
            >
              <button className="submit-button" onClick={generatePdf}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvaluation;
