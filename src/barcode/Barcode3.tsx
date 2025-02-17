import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize Quagga
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current!, // Use the ref as the target
          constraints: {
            width: 240,
            height: 120,
            facingMode: 'environment', // Use the rear camera
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'upc_reader'], // Supported barcode formats
        },
        locator: {
          patchSize: 'medium', // Size of the scanning area
          halfSample: true,
        },
        numOfWorkers: 4, // Number of workers for processing
        frequency: 10, // Scan frequency
      },
      (err) => {
        if (err) {
          console.error('Failed to initialize Quagga:', err);
          return;
        }
        console.log('Quagga initialized successfully');
        Quagga.start();
      }
    );

    // Handle barcode detection
    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      setScanResult(code);
      Quagga.stop(); // Stop scanning after a result is found
    });

    // Cleanup on unmount
    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: 'auto' }}>
      {/* Scanner Container */}
      <div ref={scannerRef} style={{ position: 'relative', width: '100%', height: 'auto' }} />

      {/* Red Scanning Line */}
      {!scanResult && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '2px',
            backgroundColor: 'red',
            transform: 'translateY(-50%)',
            animation: 'scan 2s infinite',
          }}
        />
      )}

      {/* Display Scan Result */}
      {scanResult && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Scanned Result:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;