import "./App.css";
import Home from "../pages/Home";
import GenerateKundali from "../pages/kundali/GenerateKundali";
import ShowKundali from "../pages/kundali//ShowKundali";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ToasterProvider from "../components/ui/ToasterProvider";
import UserDashboard from "../pages/user/Dashboard";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Unauthorized from "../pages/auth/Unauthorized";
import { AuthProvider } from "../hooks/useAuth";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import NewUserDashboard from "../pages/user/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <ToasterProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-kundali" element={<GenerateKundali />} />
        <Route path="/show-kundali" element={<ShowKundali />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/new-dashboard" element={<NewUserDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
