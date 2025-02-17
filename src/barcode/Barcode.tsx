
import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const Barcode: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [flash, setFlash] = useState(false)
  //const [scanning, setScanning] = useState<boolean>(true);

  const result = data.map((el, i) => {
return (
  <p key={el+i}>{el}</p>
)
  })
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: 'auto' }}>
      {/* Barcode Scanner Component */}
      <BarcodeScannerComponent
        width="100%"
        height="100%"
        torch={flash}
        onUpdate={(err, result:any) => {
          if (result) {
            setData(prev => [...prev, result.text]);
            //setScanning(false); // Stop scanning after a result is found
          } 
          
          if(err) console.log(err);
          
        }}
      />

      {/* Red Line to Indicate Scanning Area */}
      
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: 'red',
            //transform: 'translateY(-50%)',
          }}
        />
      )
      {/* Display Scanned Data */}
      <h4 onClick={() => setFlash(prev => !prev)}>Flash</h4>
      <p>{result}</p>

    </div>
  );
};

export default Barcode;