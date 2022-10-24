import React from "react";
import "./pastScoreSheet.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NumericInput from "react-numeric-input";

const PastScoreSheet = (props) => {
  const questions = props.data.questions;
  const answers = props.data.answers;
  const total = props.data.total;
  const average = props.data.average;
  const feedback = props.data.feedback;
  const duration = props.data.duration;

  let questionsList = questions.map((data, id) => {
    const ScoresheetQuestion = `Ques-${id}`;
    return (
      <div key={id} className="container score-sheet-container">
        <div className="form-group form-group-sheet">
          <label htmlFor={ScoresheetQuestion}>
            <b>{data}</b>
          </label>
          <NumericInput
            type="text"
            className="form-control form-control-sheet"
            id={ScoresheetQuestion}
            value={answers[id]}
            readOnly
          ></NumericInput>
        </div>
      </div>
    );
  });

  return (
    <div className="score-sheet-read-only">
      <div className="main-score-sheet">
        <form className="form-label form-label-class">
          <div className="form-group form-group-duration">
            <label htmlFor="Duration">Duration</label>

            <NumericInput
              className="form-control form-control-duration"
              id="Duration"
              value={duration}
              readOnly
            ></NumericInput>
          </div>

          {questionsList}

          <div className="form-group form-group-total">
            <label htmlFor="Total">Total (Out of 100)</label>
            <textarea
              className="form-control form-control-total"
              id="Total"
              value={total}
              readOnly
            ></textarea>
          </div>
          <div className="form-group form-group-average">
            <label htmlFor="Average">Average Score</label>
            <textarea
              className="form-control form-control-average"
              id="Average"
              value={average}
              readOnly
            ></textarea>
          </div>
          <div className="form-group form-group-feedback">
            <label htmlFor="Feedback">Feedback</label>
            <div className="form-control-feedback">{feedback}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PastScoreSheet;
