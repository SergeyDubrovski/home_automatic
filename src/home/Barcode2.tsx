
import { QrcodeSuccessCallback } from 'html5-qrcode'
import Html5QrcodePlugin from './HTML';
import { useState } from 'react';


function Barcode2() {

     const [result, setResult] = useState<string>('Wait!!!') 

const onNewScanResult:QrcodeSuccessCallback = (decodedText, decodedResult) => {

    setResult(decodedText)
    console.log(decodedText, decodedResult);
    
    // handle decoded results here
};

  return (
    <div>
         <Html5QrcodePlugin
         fps={10}
        
         
         showTorchButtonIfSupported={true}
         qrCodeSuccessCallback={onNewScanResult}
        />
        <h1>{result}</h1>
    </div>
   
  )
}

export default Barcode2