import React from "react";
import "./pastSelfAssessment.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const PastSelfAssessment = (props) => {
  const questions = props.questions;
  const answers = props.answers;

  let questionsList = questions
    .sort((a, b) =>
      a.displayOrder.localeCompare(b.displayOrder, "en-u-kn-true")
    )
    .map((data, id) => {
      const Question = `Ques-${id}`;
      return (
        <div key={id} className="past-assessment">
          <div className="container self-assessment-form">
            <div className="form-group form-group-self">
              <label htmlFor={Question}>
                <b>{data.question}</b>
              </label>
              <br></br>
              <div className="form-control-self">{answers[id]}</div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="self-assessment-read-only">
      <div className="form-container">
        <form className="needs-validation validation">{questionsList}</form>
      </div>
    </div>
  );
};

export default PastSelfAssessment;
