import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const Barc = () => {
    const [data, setData] = useState("Not Found");
   return (
    <>
    <BarcodeScannerComponent
      width={300}
      height={100}
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