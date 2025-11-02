import { Route, Routes } from "react-router";
import HomePage from "../pages/homePage/homePage.jsx";
import About from "../pages/about.jsx";
import RequestsDonations from "../pages/requestsDonations.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/requests-donations" element={<RequestsDonations />}></Route>
    </Routes>
  );
}

export default AppRoutes;
