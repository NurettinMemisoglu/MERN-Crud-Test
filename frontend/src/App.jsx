import { Navigate, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/create/CreatePage";
import HomePage from "./pages/home/HomePage";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
