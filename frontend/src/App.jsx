import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router";

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/messages");

  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
