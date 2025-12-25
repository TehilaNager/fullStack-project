import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { RequestProvider } from "./context/requestContext.jsx";
import { OfferProvider } from "./context/offerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RequestProvider>
        <OfferProvider>
          <App />
        </OfferProvider>
      </RequestProvider>
    </BrowserRouter>
  </StrictMode>
);
