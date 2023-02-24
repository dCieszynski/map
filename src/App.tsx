import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MapView from "./pages/MapView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<MapView />} />
    </Routes>
  );
}

export default App;
