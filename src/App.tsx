import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Barcode2 from './barcode/Barcode2'
import Barcode from './barcode/Barcode'





function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<Barcode />} />
        <Route path="/bar2" element={<Barcode2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
