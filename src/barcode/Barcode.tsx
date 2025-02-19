import  { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const NumberRecognition = () => {
  const webcamRef = useRef<any>(null);
  const [prediction, setPrediction] = useState('');
  const classifier = useRef<any>(null);
  const net = useRef<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      classifier.current = knnClassifier.create();
      net.current = await mobilenet.load();
    };

    loadModels();
  }, []);

  const capture = async () => {
    if (webcamRef.current && net.current && classifier.current) {
      const image = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = image;
      img.onload = async () => {
        const imgTensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        const activation = net.current.infer(imgTensor, 'conv_preds');
        const result = await classifier.current.predictClass(activation);

        // Здесь можно добавить логику для определения числа
        // Например, если вы обучили классификатор на числах, то result.label будет содержать метку числа
        setPrediction(result.label);
      };
    }
  };
  const videoConstraints = {
    facingMode: 'environment', // 'user' — фронтальная камера, 'environment' — задняя
  };
  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={
          videoConstraints
        }
      />
      <button onClick={capture}>Распознать число</button>
      {prediction && <p>Распознанное число: {prediction}</p>}
    </div>
  );
};

export default NumberRecognition;