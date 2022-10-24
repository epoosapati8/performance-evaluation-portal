import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../globals/services/axiosInterceptor";
import Header from "../../components/header/header.js";
import Sidenav from "../../components/side-bar/sideBar.js";
import LoaderPage from "../../components/loader-page/loaderPage";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./postAssessmentQuestions.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostAssessmentQuestions = () => {
  const [fields, setFields] = useState([
    { question: "", mandatory: true, displayOrder: "" },
  ]);

  const [errors, setErrors] = useState([{ question: "", displayOrder: "" }]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [quarter, setQuarter] = useState();
  const [year, setYear] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isLive, setLive] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date().toISOString();
    // const currentDate = "2022-10-01T09:02:12.795Z";
    // const quarterData = getQuarter();
    const quarterData = { quarter: "Q4", year: "2022" };
    axiosInstance
      .get(`/selfEvalQues/${quarterData.year}/${quarterData.quarter}`)
      .then((response) => {
        if (response.status === 200) {
          if (currentDate < response.data.data.startDate) {
            const values = response.data.data;
            setQuestions(values.questions, values.startDate, values.endDate);
            setYear(quarterData.year);
            setQuarter(quarterData.quarter);
            setUpdateFlag(true);
            setLoading(false);
          } else if (currentDate <= response.data.data.endDate) {
            setLive(true);
            setLoading(false);
            setYear(quarterData.year);
            setQuarter(quarterData.quarter);
          } else {
            const data = getNextQuarter(quarterData.quarter, quarterData.year);
            const values = response.data.data;
            setQuestions(values.questions);
            setYear(data.year);
            setQuarter(data.quarter);
            setUpdateFlag(false);
            setLoading(false);
          }
        } else {
          const prevQuarterData = getPreviousQuarter(
            quarterData.quarter,
            quarterData.year
          );

          axiosInstance
            .get(
              `/selfEvalQues/${prevQuarterData.year}/${prevQuarterData.quarter}`
            )
            .then((response) => {
              if (response.status === 200) {
                if (currentDate < response.data.data.startDate) {
                  const values = response.data.data;
                  setQuestions(
                    values.questions,
                    values.startDate,
                    values.endDate
                  );
                  setUpdateFlag(true);
                  setYear(prevQuarterData.year);
                  setQuarter(prevQuarterData.quarter);
                  setLoading(false);
                } else if (currentDate <= response.data.data.endDate) {
                  setYear(prevQuarterData.year);
                  setQuarter(prevQuarterData.quarter);
                  setLive(true);
                  setLoading(false);
                } else {
                  const values = response.data.data;
                  setQuestions(values.questions);
                  setYear(quarterData.year);
                  setQuarter(quarterData.quarter);
                  setUpdateFlag(false);
                  setLoading(false);
                }
              } else {
                const prevQuarterData2 = getPreviousQuarter(
                  prevQuarterData.quarter,
                  prevQuarterData.year
                );
                axiosInstance
                  .get(
                    `/selfEvalQues/${prevQuarterData2.year}/${prevQuarterData2.quarter}`
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      const values = response.data.data;
                      setQuestions(values.questions);
                      setYear(prevQuarterData.year);
                      setQuarter(prevQuarterData.quarter);
                    } else {
                      setYear(quarterData.year);
                      setQuarter(quarterData.quarter);
                    }
                    setUpdateFlag(false);
                    setLoading(false);
                    console.log(response);
                  })
                  .catch((response) => {
                    setLoading(false);
                    console.log(response);
                  });
              }
              console.log(response);
            })
            .catch((response) => {
              setLoading(false);
              console.log(response);
            });
        }
        console.log(response);
      })
      .catch((response) => {
        setLoading(false);
        console.log(response);
      });
  }, []);

  const setQuestions = (questions, startDate, endDate) => {
    let error = [];
    for (let i = 0; i < questions.length; i++) {
      error.push({ question: "", displayOrder: "" });
    }
    setErrors(error);
    setFields(questions);
    if (startDate) {
      setStartDate(new Date(startDate));
      const tempDate = new Date(endDate);
      const finalEndDate = tempDate.setDate(tempDate.getDate() - 1);
      setEndDate(new Date(finalEndDate));
    }
  };

  const getQuarter = () => {
    const today = new Date();
    const quarter = `Q${Math.floor((today.getMonth() + 3) / 3)}`;
    return { quarter, year: today.getFullYear().toString() };
  };

  const getPreviousQuarter = (quarter, year) => {
    if (quarter === "Q1") {
      return { quarter: "Q4", year: (parseInt(year) - 1).toString() };
    } else if (quarter === "Q2") {
      return { quarter: "Q1", year };
    } else if (quarter === "Q3") {
      return { quarter: "Q2", year };
    } else {
      return { quarter: "Q3", year };
    }
  };

  const getNextQuarter = (quarter, year) => {
    if (quarter === "Q1") {
      return { quarter: "Q2", year };
    } else if (quarter === "Q2") {
      return { quarter: "Q3", year };
    } else if (quarter === "Q3") {
      return { quarter: "Q4", year };
    } else {
      return { quarter: "Q1", year: (parseInt(year) + 1).toString() };
    }
  };

  const handleQuestionChange = (i, event) => {
    const values = [...fields];
    values[i].question = event.target.value;
    setFields(values);
    const error = [...errors];
    if (event.target.value.match(/^(?!\s)[\W\w\s-]*$/) == null) {
      error[i].question = "Enter valid data";
      setErrors(error);
    } else {
      error[i].question = "";
      setErrors(error);
    }
  };

  const handleDisplayOrderChange = (i, event) => {
    const values = [...fields];
    values[i].displayOrder = event.target.value;
    setFields(values);
    const error = [...errors];
    if (event.target.value.match(/(?!\s)[\p{P}\p{S}\w\s-]*$/) == null) {
      error[i].displayOrder = "Enter only numbers";
      setErrors(error);
    } else {
      error[i].displayOrder = "";
      setErrors(error);
    }
  };

  const handleMandatoryChange = (i, event) => {
    const values = [...fields];
    if (event.target.value === "true") {
      values[i].mandatory = true;
    } else {
      values[i].mandatory = false;
    }
    setFields(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ question: "", mandatory: true, displayOrder: "" });
    const error = [...errors];
    error.push({ question: "", displayOrder: "" });
    setFields(values);
    setErrors(error);
  };

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    const error = [...errors];
    error.splice(i, 1);
    setFields(values);
    setErrors(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].question !== "" || errors[i].displayOrder !== "") {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      const payload = {
        year,
        quarter,
        questions: fields,
        startDate: startDate.toLocaleDateString("en-GB"),
        endDate: endDate.toLocaleDateString("en-GB"),
      };
      console.log(payload);
      if (updateFlag) {
        console.log(`Update ${quarter}`);
        axiosInstance
          .put("/selfEvalQues", payload)
          .then((response) => {
            toast.success("Successfully updated", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(response);
          })
          .catch((response) => {
            toast.error("Failed to update", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(response);
          });
      } else {
        console.log(`Post ${quarter}`);
        axiosInstance
          .post("/selfEvalQues", payload)
          .then((response) => {
            toast.success("Submission Successful", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(response);
            setUpdateFlag(true);
          })
          .catch((response) => {
            toast.error("Submission Failed", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(response);
          });
      }
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  let questionsList = fields.map((field, idx) => {
    return (
      <div key={`${field}-${idx}`} className="form-group">
        <br></br>
        <label htmlFor="questions">{`Question ${idx + 1}`}</label>
        <textarea
          placeholder="Enter your question"
          className="form-control"
          id="question"
          value={field.question}
          onChange={(e) => handleQuestionChange(idx, e)}
          required
        />
        <div className="text-danger valid-input-error">
          {errors[idx].question}
        </div>
        <br></br>
        <label htmlFor="mandatory">Mandatory</label>
        <select
          name="mandatory"
          id="mandatory"
          value={field.mandatory.toString()}
          onChange={(e) => handleMandatoryChange(idx, e)}
          className="form-control"
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <br></br>
        <label htmlFor="displayOrder">Display Order</label>
        <input
          type="text"
          placeholder="Enter the display order"
          className="form-control"
          id="displayOrder"
          value={field.displayOrder}
          onChange={(e) => handleDisplayOrderChange(idx, e)}
          required
        ></input>
        <div className="text-danger valid-input-error">
          {errors[idx].displayOrder}
        </div>
        <br></br>
        <button
          type="button"
          className="butn remove-button"
          onClick={() => handleRemove(idx)}
        >
          Remove
        </button>
      </div>
    );
  });

  return isLoading ? (
    <LoaderPage />
  ) : (
    <div className="post-assessment-questions">
      <div>
        <Header />
        <Sidenav />
      </div>
      <div className="row label-row">
        <div className="col-sm-12 col-md-12 col-lg-10 offset-md-2">
          <label className="label-primary">
            Year: {year} Quarter: {quarter}
          </label>
        </div>
      </div>
      <div className="container-fluid questions-form">
        <div className="row justify-content-md-center questions-row">
          <div className="col-sm-12 col-md-8 col-lg-8 heading">
            <p className="h3 heading-content">Post Questions</p>
          </div>

          {isLive ? (
            <div className="col-sm-12 col-md-12 col-lg-12 form-data">
              The form is live.
            </div>
          ) : (
            <form className="post-question-form" onSubmit={handleSubmit}>
              <label className="startDate" htmlFor="startDate">
                Start Date:{" "}
              </label>
              <DatePicker
                className="form-control start-date"
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => handleStartDateChange(date)}
                placeholderText="DD/MM/YYYY"
                required
                selectsStart
                startDate={startDate}
                endDate={endDate}
                id="startDate"
                autoComplete="off"
              />
              <br></br>
              <label className="endDate" htmlFor="endDate">
                End Date:{" "}
              </label>
              <DatePicker
                className="form-control end-date"
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => handleEndDateChange(date)}
                placeholderText="DD/MM/YYYY"
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                id="endDate"
                autoComplete="off"
              />
              <br></br>
              {questionsList}
              <button
                type="button"
                className="butn add-button"
                onClick={() => handleAdd()}
              >
                Add
              </button>
              <br></br>
              <div className="mt-5 text-center submit">
                <button className="butn submit-button" type="submit">
                  {updateFlag ? "Update" : "Submit"}
                </button>
                <ToastContainer />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAssessmentQuestions;
