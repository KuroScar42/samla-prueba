import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "Components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<div>hola</div>} />
        <Route path="/history" element={<div>adios</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
