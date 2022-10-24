import React, { useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import "./scoreSheet.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../globals/services/axiosInterceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScoreSheet = (props) => {
  useEffect(() => {
    if (props.data.answers) {
      setAnsData(props.data.answers);
      setFeedback(props.data.feedback);
      setDuration(props.data.duration);
      setUpdateFlag(true);
    } else {
      let answers = [];
      for (let i = 0; i < props.data.questions.length; i++) {
        answers.push(0);
      }
      setAnsData(answers);
    }
  }, [props]);

  const [ansData, setAnsData] = useState([]);
  const [feedback, setFeedback] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [duration, setDuration] = useState(1);
  const data = props.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const sum = ansData.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    const payload = {
      empId: props.empId,
      year: props.year,
      quarter: props.quarter,
      projectName: props.project,
      answers: ansData,
      total: sum,
      feedback: feedback,
      duration: duration,
    };
    if (updateFlag) {
      axiosInstance
        .put(`/scoreSheetAnswers`, payload)
        .then(() => {
          toast.success("Updation successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Updation Failed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } else {
      axiosInstance
        .post(`/scoreSheetAnswers`, payload)
        .then(() => {
          toast.success("Submission successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setUpdateFlag(true);
        })
        .catch(() => {
          toast.error("Submission Failed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  const handleNumericChange = (i, e) => {
    let tempAnsData = [...ansData];
    if (e !== null) {
      if (parseInt(e) > 25) {
        tempAnsData[i] = 25;
      } else if (parseInt(e) < 0) {
        tempAnsData[i] = 0;
      } else {
        tempAnsData[i] = e;
      }
    } else {
      tempAnsData[i] = "";
    }
    setAnsData(tempAnsData);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleDurationChange = (e) => {
    let tempDuration = duration;
    if (e !== null) {
      if (e > 3) {
        tempDuration = 3;
      } else if (e < 1) {
        tempDuration = 1;
      } else {
        tempDuration = e;
      }
    } else {
      tempDuration = "";
    }
    setDuration(tempDuration);
  };

  let questionsList = data.questions.map((data, id) => {
    const ScoresheetQuestion = `Ques-${id}`;
    return (
      <div key={id} className="container sheet-container">
        <div className="form-group form-group-scores">
          <label htmlFor={ScoresheetQuestion}>
            <b>{data}</b>
            <div className="required">*</div>
          </label>
          <NumericInput
            type="text"
            className="form-control form-control-scores"
            id={ScoresheetQuestion}
            min={0}
            max={25}
            value={ansData[id]}
            precision={0}
            onInput={() => {
              "(!validity.rangeOverflow||(value=25)) && (!validity.rangeUnderflow||(value=0)) && (!validity.stepMismatch||(value=parseInt(this.value)));";
            }}
            onChange={(e) => handleNumericChange(id, e)}
            required
          ></NumericInput>
        </div>
      </div>
    );
  });

  return (
    <div className="score-sheet-page">
      <div className="main-score-sheet">
        <form className="form-label form-label-class" onSubmit={handleSubmit}>
          <div className="form-group form-group-duration">
            <label htmlFor="Duration">Duration</label>
            <div className="required">*</div>

            <NumericInput
              className="form-control form-control-duration"
              id="Duration"
              min={1}
              max={3}
              value={duration}
              precision={0}
              onInput={() => {
                "(!validity.rangeOverflow||(value=25)) && (!validity.rangeUnderflow||(value=0)) && (!validity.stepMismatch||(value=parseInt(this.value)));";
              }}
              onChange={handleDurationChange}
              required
            ></NumericInput>
          </div>

          {questionsList}

          <div className="form-group form-group-feedback">
            <label htmlFor="Feedback">Feedback</label>
            <textarea
              className="form-control form-control-feedback"
              id="Feedback"
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your Feedback"
            ></textarea>
          </div>
          <div className="mt-5 text-center Submit">
            <button type="submit" className="btn-secondary submit-button">
              {updateFlag ? "Update" : "Submit"}
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreSheet;
