import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home/Home'
import Barc from './home/Barcode'
import Html5QrcodePlugin from './home/HTML'
import { QrcodeSuccessCallback } from 'html5-qrcode'




function App() {
  const onNewScanResult:QrcodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
    
    // handle decoded results here
};

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<Barc />} />
        <Route path="/bar2" element={<Html5QrcodePlugin 
         fps={10}
         qrbox={250}
         disableFlip={false}
         qrCodeSuccessCallback={onNewScanResult}
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
