import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/create/CreatePage";
import HomePage from "./pages/home/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages//login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
