import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import jwt from "jwt-decode";
import axiosInstance from "../../globals/services/axiosInterceptor";
import LoaderPage from "../../components/loader-page/loaderPage";
import SelfForm from "../self-assessment/selfAssessment";
import EmpForm from "../past-evaluation/pastEvaluation";
import EmptyPage from "../../components/empty-page/emptyPage";

const AssessmentIntermediate = () => {
  const [isLoading, setLoading] = useState(true);
  const [quesLive, setQuesLive] = useState(true);
  const [scoreLive, setScoreLive] = useState(true);
  const [dataFlag, setDataFlag] = useState(true);
  const [projects, setProjects] = useState([]);

  const params = useParams();
  const { year, quarter } = params;
  const user = jwt(localStorage.getItem("accessToken"));

  useEffect(() => {
    axiosInstance
      .get(`selfEvalQues/status/${year}/${quarter}`)
      .then((response) => {
        if (response.status === 204) {
          setDataFlag(false);
          setQuesLive(false);
          setLoading(false);
        } else {
          const status = response.data.data.isLive;
          if (status === false) {
            setQuesLive(false);
            axiosInstance
              .get(`/scoreSheetQues/status/${year}/${quarter}`)
              .then((response) => {
                if (response.status === 204) {
                  setDataFlag(false);
                  setScoreLive(false);
                  setLoading(false);
                } else {
                  const scoreStatus = response.data.data.isLive;

                  if (scoreStatus === false) {
                    setScoreLive(false);
                    axiosInstance
                      .get(
                        `/perfEvalAnswers/project/${user.empId}/${year}/${quarter}`
                      )
                      .then((response) => {
                        if (response.status === 204) {
                          setDataFlag(false);
                          setLoading(false);
                        } else {
                          const proj = response.data.data;
                          setProjects(proj);
                          setLoading(false);
                        }
                      })
                      .catch(() => {
                        setDataFlag(false);
                        setLoading(false);
                      });
                  } else {
                    setLoading(false);
                  }
                }
              })
              .catch(() => {
                setDataFlag(false);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        }
      })
      .catch(() => {
        setDataFlag(false);
        setLoading(false);
      });
  }, [year, quarter, user.empId]);

  if (isLoading === true) {
    return <LoaderPage />;
  } else {
    if (quesLive && dataFlag) {
      return <SelfForm year={year} quarter={quarter} />;
    } else if (quesLive === false && scoreLive === false && dataFlag === true) {
      return (
        <EmpForm
          year={year}
          quarter={quarter}
          projects={projects}
          project={projects[0]}
          empId={user.empId}
          empName={user.name}
          disable={true}
        />
      );
    } else if (quesLive === false && scoreLive === true && dataFlag === true) {
      return <EmptyPage message={"Manager is yet to evaluate you."} />;
    } else if (
      quesLive === false &&
      scoreLive === false &&
      dataFlag === false
    ) {
      return <EmptyPage message={"No data available."} />;
    } else {
      return <EmptyPage message={"Form is not live yet."} />;
    }
  }
};
export default AssessmentIntermediate;
