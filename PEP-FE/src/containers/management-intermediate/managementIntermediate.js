import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import jwt from "jwt-decode";
import axiosInstance from "../../globals/services/axiosInterceptor";
import LoaderPage from "../../components/loader-page/loaderPage";
import RmForm from "../reportee-forms/reporteeForms";
import EmpForm from "../past-evaluation/pastEvaluation";
import EmptyPage from "../../components/empty-page/emptyPage";

const ManagementIntermediate = () => {
  const [isLoading, setLoading] = useState(true);
  const [quesLive, setQuesLive] = useState(true);
  const [scoreLive, setScoreLive] = useState(true);
  const [dataFlag, setDataFlag] = useState(true);
  const [projects, setProjects] = useState([]);

  const params = useParams();
  const { year, quarter, empId, empName, project } = params;
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
                    if (user.role === "hrManager") {
                      axiosInstance
                        .get(
                          `/perfEvalAnswers/project/${empId}/${year}/${quarter}`
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
                      setProjects([project]);
                      setLoading(false);
                    }
                  } else {
                    setLoading(false);
                  }
                }
              })
              .catch(() => {
                setLoading(false);
                setDataFlag(false);
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
  }, [year, quarter, empId, user.role, project]);

  if (isLoading === true) {
    return <LoaderPage />;
  } else {
    if (
      quesLive === false &&
      scoreLive === true &&
      (user.role === "reportingManager" ||
        (user.role === "hrManager" && project === "HR-Team")) &&
      dataFlag
    ) {
      return (
        <RmForm
          year={year}
          quarter={quarter}
          projects={project}
          empId={empId}
          empName={empName}
        />
      );
    } else if (quesLive === false && scoreLive === false && dataFlag) {
      return (
        <EmpForm
          year={year}
          quarter={quarter}
          projects={projects}
          project={project}
          empId={empId}
          empName={empName}
          disable={false}
        />
      );
    } else if (quesLive === false && scoreLive === true && dataFlag) {
      return (
        <EmptyPage message={"Data hasn't been submitted by the manager yet."} />
      );
    } else {
      return <EmptyPage message={"Data hasn't been submitted yet."} />;
    }
  }
};
export default ManagementIntermediate;
