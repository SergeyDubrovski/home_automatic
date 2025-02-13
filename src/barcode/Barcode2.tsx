
import { QrcodeSuccessCallback } from 'html5-qrcode'
import { useState } from 'react';
import Html5QrcodePlugin2 from './Html5Qr';


function Barcode2() {

     const [result, setResult] = useState<string[]>(['Wait!!!']) 

const onNewScanResult:QrcodeSuccessCallback = (decodedText, decodedResult) => {

    setResult((prev:string[]):string[] => {
      if(prev[0] === 'Wait!!!') return [decodedText]
      if (prev[prev.length - 1] === decodedText) return prev
      return [...prev, decodedText]
    })
    console.log(decodedText, decodedResult);
    
    // handle decoded results here
};
const res = result.map((el, i) => {
  return(
    <h6 key={el + i}>{el}</h6>
  )
})

  return (
    <div>
         <Html5QrcodePlugin2
         fps={10}
         qrbox={{width: 150, height: 50}}
         
         showTorchButtonIfSupported={true}
         qrCodeSuccessCallback={onNewScanResult}
        />
        <h1>{res}</h1>
    </div>
   
  )
}

export default Barcode2