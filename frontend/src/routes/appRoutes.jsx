import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import RequestsPage from "../pages/RequestsPage/RequestsPage.jsx";
import OffersPage from "../pages/OffersPage/OffersPage.jsx";
import DetailsCard from "../pages/DetailsCard/DetailsCard.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/aboutPage" element={<AboutPage />}></Route>
      <Route path="/requests" element={<RequestsPage />}></Route>
      <Route path="/offers" element={<OffersPage />}></Route>
      <Route path="/card-details/:id" element={<DetailsCard />}></Route>
    </Routes>
  );
}

export default AppRoutes;
