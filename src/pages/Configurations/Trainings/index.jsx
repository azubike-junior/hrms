/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import "../../../assets/css/antdstyle.css";
import { getBehavioralMetrics } from "../../../services/PerformanceManagement/Configurations/behavioralMetric/getBehavioralMetric";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import BehavioralMetric from './BehavioralMetric';
import FunctionalMetric from './FunctionalMetric';
import Recommendation from './Recommendation';

const Trainings = () => {
  const dispatch = useDispatch();
  const [training, setTraining] = useState(1);

  const displayTraining = (training) => {
    if (training === 1) {
      return <BehavioralMetric />;
    } else if (training === 2) {
      return <FunctionalMetric />;
    } else if (training === 3) {
      return <Recommendation />;
    }
  };

  useEffect(() => {
    dispatch(getBehavioralMetrics());
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Configurations - Training</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <h4 className="user-name m-t-10 m-b-10">TRAINING</h4>
        {/* </div> */}
        {/* /Page Header */}

        <div className="card m-b-50">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                  <li className="nav-item">
                    <a
                      onClick={() => setTraining(1)}
                      className="nav-link"
                      data-toggle="tab"
                    >
                      BEHAVIOURAL TRAINING
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      // href="#functional_training"
                      data-toggle="tab"
                      onClick={() => {
                        // dispatch(getTechnicalTraining());
                        setTraining(2);
                      }}
                    >
                      FUNCTIONAL TRAINING
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      // href="#recommendation_type"
                      data-toggle="tab"
                      onClick={() => {
                        setTraining(3);
                      }}
                    >
                      RECOMMENDATION
                    </a>
                  </li>
                </ul>

                {displayTraining(training)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* Delete Request Modal */}

      {/* /Delete Request Modal */}
    </div>
  );
};
export default Trainings;
