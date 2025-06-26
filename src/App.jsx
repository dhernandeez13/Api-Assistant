import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ApiProvider } from "./contexts/ApiContext";
import Navbar from "./components/NavBar";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Profile from "./pages/Profile";

function App() {
  return (
    <ApiProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </ApiProvider>
  );
}

export default App;
