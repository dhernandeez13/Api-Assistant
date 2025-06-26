import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ApiProvider } from "./contexts/ApiContext";
import Navbar from "./components/NavBar";

function App() {
  return (
    <ApiProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </ApiProvider>
  );
}

export default App;
