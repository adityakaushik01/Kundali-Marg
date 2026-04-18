import "./App.css";
import Home from "../pages/static/Home";
import About from "../pages/static/About";
import Services from "../pages/static/Services";
import Blog from "../pages/static/Blog";
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

function App() {
  return (
    <AuthProvider>
      <ToasterProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/generate-kundali" element={<GenerateKundali />} />
          <Route path="/show-kundali" element={<ShowKundali />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
