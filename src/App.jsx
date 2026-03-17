import './App.css'
import Home from '../pages/Home'
import GenerateKundali from '../pages/kundali/GenerateKundali'
import ShowKundali from '../pages/kundali//ShowKundali'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import ToasterProvider from "../components/ui/ToasterProvider";

function App() {

  return (
    <>
    <ToasterProvider />
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/GenerateKundali" element={<GenerateKundali />} />
      <Route path="/ShowKundali" element={<ShowKundali />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>

    </>
  )
}

export default App
