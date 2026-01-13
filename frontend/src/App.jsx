import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
