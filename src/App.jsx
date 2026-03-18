import './App.css'
import Home from '../pages/Home'
import GenerateKundali from '../pages/kundali/GenerateKundali'
import ShowKundali from '../pages/kundali//ShowKundali'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import ToasterProvider from "../components/ui/ToasterProvider";
import UserDashboard from '../pages/user/Dashboard'
import VerifyEmail from "../pages/auth/VerifyEmail";

function App() {

  return (
    <>
    <ToasterProvider />
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate-kundali" element={<GenerateKundali />} />
      <Route path="/show-kundali" element={<ShowKundali />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Routes>

    </>
  )
}

export default App
