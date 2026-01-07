import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/appRoutes";

export default function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
