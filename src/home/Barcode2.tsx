
import { QrcodeSuccessCallback } from 'html5-qrcode'
import Html5QrcodePlugin from './HTML';
import { useState } from 'react';


function Barcode2() {

     const [result, setResult] = useState<string[]>(['Wait!!!']) 

const onNewScanResult:QrcodeSuccessCallback = (decodedText, decodedResult) => {

    setResult((prev:string[]):string[] => {
      if(prev[0] === 'Wait!!!') return [decodedText]

      return [...prev, decodedText]
    })
    console.log(decodedText, decodedResult);
    
    // handle decoded results here
};
const res = result.map((i, el) => {
  return(
    <h1 key={el + i}>{el}</h1>
  )
})

  return (
    <div>
         <Html5QrcodePlugin
         fps={10}
         qrbox={{width: 200, height: 60}}
         
         showTorchButtonIfSupported={true}
         qrCodeSuccessCallback={onNewScanResult}
        />
        <h1>{res}</h1>
    </div>
   
  )
}

export default Barcode2