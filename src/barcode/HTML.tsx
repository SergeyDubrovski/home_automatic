// file = Html5QrcodePlugin.jsx
import { Html5Qrcode, Html5QrcodeResult, Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeError, QrDimensionFunction, QrDimensions } from 'html5-qrcode/esm/core';
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { useEffect, useState } from 'react';

export type Props = {
    fps: number | undefined
    qrbox?: number | QrDimensions | QrDimensionFunction | undefined
    aspectRatio?: number | undefined
    disableFlip?: boolean | undefined
    videoConstraints?: MediaTrackConstraints | undefined
    showTorchButtonIfSupported?: boolean | undefined
    verbose?: boolean | undefined
    qrCodeSuccessCallback: (decodedText: string, result: Html5QrcodeResult) => void
    qrCodeErrorCallback?: (errorMessage: string, error: Html5QrcodeError) => void


}
const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodeScannerConfig) => {
    const config: Html5QrcodeScannerConfig = {
        fps: undefined,
        qrbox: {
            width: 200,
            height: 60
        },
        aspectRatio: undefined,
        disableFlip: undefined,
        videoConstraints: undefined,
        showTorchButtonIfSupported: true

    };
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props: Props) => {

    const [camId, setCamId] = useState<string>('')
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };

    }, []);

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            setCamId(cameraId)
            // .. use this to start scanning.
        }
    }).catch(err => {
        console.log(err);
        
    });
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    html5QrCode.start(
      camId, 
      {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
      },
      (decodedText, decodedResult) => {
        console.log(decodedText, decodedResult);
        
      },
      (errorMessage) => {
        console.log(errorMessage);
        
      })
    .catch((err) => {
      console.log(err);
      
    });
    return (


        <div id={'reader'} />

    );
};

export default Html5QrcodePlugin;