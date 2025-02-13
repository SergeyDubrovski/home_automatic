import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Barc from './home/Barcode'
import Barcode2 from './home/Barcode2'





function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<Barc />} />
        <Route path="/bar2" element={<Barcode2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
