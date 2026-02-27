import { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import ToDo from "./pages/ToDo.jsx";
import ThemeBar from "./components/Theme.jsx";
import IconPicker from "./components/IconPicker.jsx";
import Matrix from "./pages/Matrix.jsx";
import Theme from "./components/Theme.jsx";
import Milestone from "./pages/Milestone.jsx";
function App() {
  const [icon, setIcon] = useState("check");

  return (
    <>
      {/* Responsive Theme Bar (Mobile specific positioning handled in CSS) */}
      <Theme />
      {/* <IconPicker value={icon} onChange={setIcon}/> */}
      {/* <ThemeBar /> */}
      <Milestone />
      {/* <ToDo /> */}
      {/* <Matrix /> */}
    </>
  );
}

export default App;
