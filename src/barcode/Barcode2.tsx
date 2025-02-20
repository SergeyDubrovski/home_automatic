
import { QrcodeSuccessCallback } from 'html5-qrcode'
import { useState } from 'react';
import Html5QrcodePlugin2 from './Html5Qr';
import { QrDimensions } from 'html5-qrcode/esm/core';


function Barcode2() {

     const [result, setResult] = useState<string[]>(['Wait!!!']) 
     const [decoded, setDecoded] =useState<any>('')

const onNewScanResult:QrcodeSuccessCallback = (decodedText, decodedResult) => {

    setResult((prev:string[]):string[] => {
      if(prev[0] === 'Wait!!!') return [decodedText]
      if (prev[prev.length - 1] === decodedText) return prev
      return [...prev, decodedText]
    })
    console.log(decodedText, decodedResult);
    setDecoded(decodedResult.result.format?.formatName)
    // handle decoded results here
};
type QrDimensionFunction =
    (viewfinderWidth: number, viewfinderHeight: number) => QrDimensions;

    let qrboxFunction:QrDimensionFunction = function(viewfinderWidth, viewfinderHeight) {
      let minEdgePercentage = 0.7; // 70%
      let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
      let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
      return {
          width: qrboxSize,
          height: qrboxSize
      };
  }
const res = result.map((el, i) => {
  return(
    <h6 key={el + i}>{el}</h6>
  )
})

  return (
    <div>
         <Html5QrcodePlugin2
         fps={100}
         qrbox={qrboxFunction}
         
         showTorchButtonIfSupported={true}
         qrCodeSuccessCallback={onNewScanResult}
        />
        <h1>{res}</h1>
        <h2>{decoded}</h2>
    </div>
   
  )
}

export default Barcode2