import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // Инициализация сканера
  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode("qr-scanner");
  }, []);

  // Запуск сканирования
  const startScanning = () => {
    if (html5QrCodeRef.current) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrCodeRef.current
        .start(
          { facingMode: "environment" }, // Использовать заднюю камеру
          config,
          (decodedText: string) => {
            console.log("Результат:", decodedText);
            alert(`Результат: ${decodedText}`);
            stopScanning(); // Остановить сканирование после успешного сканирования
          },
          (errorMessage: string) => {
            console.warn("Ошибка сканирования:", errorMessage);
          }
        )
        .then(() => {
          setIsScanning(true);
        })
        .catch((err: string) => {
          console.error("Ошибка запуска камеры:", err);
        });
    }
  };

  // Остановка сканирования
  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          setIsScanning(false);
          console.log("Сканирование остановлено.");
        })
        .catch((err: string) => {
          console.error("Ошибка остановки сканирования:", err);
        });
    }
  };

  return (
    <div>
      <div id="qr-scanner" style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}></div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {!isScanning ? (
          <button
            onClick={startScanning}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Начать сканирование
          </button>
        ) : (
          <button
            onClick={stopScanning}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Остановить сканирование
          </button>
        )}
      </div>
    </div>
  );
};

export default QrScanner;