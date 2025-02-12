import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const Barc = () => {
    const [data, setData] = useState("Not Found");
    const [stop, setStop] = useState<boolean>(false)
   return (
    <>
    <BarcodeScannerComponent
    delay={3000}
      width={400}
      height={200}
      torch={true}
      stopStream={stop}
      onUpdate={(err, result: any) => {
        if (result) {setData(result.text);
            setStop(true)
        }
        
        if(err) console.log(err);
        
      }}
    />
    <p>{data}</p>
  </>)
};

export default Barc