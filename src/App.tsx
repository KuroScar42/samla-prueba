import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import NotFound from "Components/NotFound";
import Register from "Components/Register";
import AdditionalData from "Components/AdditionalData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/additionalData" element={<AdditionalData />} />
        <Route path="/history" element={<div>History</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
