
import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const Barcode: React.FC = () => {
  const [data, setData] = useState<string>('No result');
  const [scanning, setScanning] = useState<boolean>(true);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: 'auto' }}>
      {/* Barcode Scanner Component */}
      <BarcodeScannerComponent
        width="100%"
        height="100%"
        onUpdate={(err, result:any) => {
          if (result) {
            setData(result.text);
            setScanning(false); // Stop scanning after a result is found
          } else {
            setData('No result');
          }
          if(err) console.log(err);
          
        }}
      />

      {/* Red Line to Indicate Scanning Area */}
      {scanning && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: 'red',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      {/* Display Scanned Data */}
      <p>{data}</p>
    </div>
  );
};

export default Barcode;