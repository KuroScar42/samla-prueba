import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import NotFound from "./Components/NotFound";
import Register from "./Components/Register";
import AdditionalData from "./Components/AdditionalData";
import Selfie from "./Components/Selfie";
import HistoryList from "./Components/HistoryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/additionalData" element={<AdditionalData />} />
        <Route path="/selfie" element={<Selfie />} />
        <Route path="/history" element={<HistoryList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
