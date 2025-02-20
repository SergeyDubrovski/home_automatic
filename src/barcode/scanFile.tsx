import { useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrCodeScanner = () => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const html5Qrcode = new Html5Qrcode("qr-reader");
    html5Qrcode.scanFileV2(file, true)
      .then(decodedText => {
        console.log("QR Code scanned successfully:", decodedText);
        alert(`QR Code scanned successfully: ${decodedText}`);
      })
      .catch(err => {
        console.error("Error scanning QR code:", err);
        alert("Error scanning QR code. Please try again.");
      });
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <div id="qr-reader" style={{ width: '500px', height: '500px' }}></div>
    </div>
  );
};

export default QrCodeScanner;