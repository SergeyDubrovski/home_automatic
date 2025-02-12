import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Barcode from './services/Barcode'


function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<Barcode />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
