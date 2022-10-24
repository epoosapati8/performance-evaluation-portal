import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./routers/mainRouter";

function App() {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
}

export default App;
