import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import RequestsPage from "../pages/RequestsPage/RequestsPage.jsx";
import OffersPage from "../pages/OffersPage/OffersPage.jsx";
import CreateRequest from "../pages/CreateRequest/CreateRequest.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import EditUser from "../pages/EditUser/EditUser.jsx";
import SignOut from "../pages/SignOut/SignOut.jsx";
import EditRequest from "../pages/EditRequest/EditRequest.jsx";
import EditOffer from "../pages/EditOffer/EditOffer.jsx";
import CreateOffer from "../pages/CreateOffer/CreateOffer.jsx";
import DetailsOffer from "../pages/DetailsOffer/DetailsOffer.jsx";
import DetailsRequest from "../pages/DetailsRequest/DetailsRequest.jsx";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-out" element={<SignOut />}></Route>
      <Route path="/edit-user/:id" element={<EditUser />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/requests" element={<RequestsPage />}></Route>
      <Route path="/details-request/:id" element={<DetailsRequest />}></Route>
      <Route path="/create-request" element={<CreateRequest />}></Route>
      <Route path="/edit-request" element={<EditRequest />}></Route>
      <Route path="/offers" element={<OffersPage />}></Route>
      <Route path="/details-offer/:id" element={<DetailsOffer />}></Route>
      <Route path="/create-offer" element={<CreateOffer />}></Route>
      <Route path="/edit-offer" element={<EditOffer />}></Route>
      <Route path="/favorites" element={<FavoritesPage />}></Route>
    </Routes>
  );
}

export default AppRoutes;
