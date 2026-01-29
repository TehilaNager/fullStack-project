import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import RequestsPage from "../pages/RequestsPage/RequestsPage.jsx";
import OffersPage from "../pages/OffersPage/OffersPage.jsx";
import DetailsCard from "../pages/DetailsCard/DetailsCard.jsx";
import CreateRequest from "../pages/CreateRequest/CreateRequest.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import EditUser from "../pages/EditUser/EditUser.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/edit-user/:id" element={<EditUser />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/requests" element={<RequestsPage />}></Route>
      <Route path="/offers" element={<OffersPage />}></Route>
      <Route path="/card-details/:id" element={<DetailsCard />}></Route>
      <Route path="/create-request" element={<CreateRequest />}></Route>
    </Routes>
  );
}

export default AppRoutes;
