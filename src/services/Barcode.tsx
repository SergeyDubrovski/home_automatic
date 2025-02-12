import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const Barc = () => {
    const [data, setData] = useState("Not Found");
   return (
    <>
    <BarcodeScannerComponent
    delay={1000}
      width={400}
      height={200}
      torch={true}
      onUpdate={(err, result: any) => {
        if (result) setData(result.text);
        else setData("Not Found");
        if(err) console.log(err);
        
      }}
    />
    <p>{data}</p>
  </>)
};

export default Barc