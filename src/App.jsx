import './App.css'
import Home from '../pages/Home'
import GenerateKundali from '../pages/GenerateKundali'
import ShowKundali from '../pages/ShowKundali'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/GenerateKundali" element={<GenerateKundali />} />
      <Route path="/ShowKundali" element={<ShowKundali />} />
    </Routes>

    </>
  )
}

export default App
