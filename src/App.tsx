import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Barcode2 from './barcode/Barcode2'
import Barcode from './barcode/Barcode'
import BarcodeScanner from './barcode/Barcode3'
import KNNClassifier from './barcode/Model'





function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<Barcode />} />
        <Route path="/bar2" element={<Barcode2 />} />
        <Route path="/bar3" element={<BarcodeScanner />} />
        <Route path="/model" element={<KNNClassifier />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
