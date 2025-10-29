import { Route, Routes } from "react-router";
import HomePage from "../pages/homePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default AppRoutes;
