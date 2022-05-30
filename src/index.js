import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./services/store/store";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import "./assets/js/app.js";

import {
  createStore,
  useStateMachine,
  StateMachineProvider,
  GlobalState,
} from "little-state-machine";

createStore(
  {
    data: {
      exceptionalAchievement: "",
      selectedBehavioralTrainings: [],
      selectedTechnicalTrainings: [],
      appraisalRates: {},
      appraisalResults: {},
      appraiseeTimeManagementScore: "",
      appraiseePunctualityScore: "",
      appraiseeCommunicationScore: "",
      appraiseeProfessionalConductScore: "",
      appraiseeAnalyticalThinkingScore: "",
      appraiseeBehaviourArray: [],
      appraiseeFunctionalArray: [],
      appraiseeBehaviouralTrainings: "",
      appraiseeFunctionalTrainings: "",
      totalAppraisalResult: "",
      appraiseeResults: {},
      appraiseeRates: {},
      values: {},
      rateResult: "",
      strengthResult: "",
      secondSupervisorName: "",
      secondLevelSupervisorId: "",
    },
  },
  {}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StateMachineProvider>
        <App />
      </StateMachineProvider>
    </Provider>
  </React.StrictMode>
);
