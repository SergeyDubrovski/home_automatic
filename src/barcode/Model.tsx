import  {  useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const KNNClassifier = () => {
  const [classifier, setClassifier] = useState<any>(null);
  const [net, setNet] = useState<any>(null);
  const [prediction, setPrediction] = useState('');
  const [training, setTraining] = useState(false);

  // Загрузка модели MobileNet и создание классификатора
  useEffect(() => {
    const loadModels = async () => {
      const classifier:any = knnClassifier.create();
      const net:any = await mobilenet.load();
      setClassifier(classifier);
      setNet(net);
    };

    loadModels();
  }, []);

  // Функция для добавления примера в классификатор
  const addExample = async (imageElement:any, classId:any) => {
    if (net && classifier) {
      // Преобразуем изображение в тензор
      const img = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      // Получаем активации из MobileNet
      const activation = net.infer(img, 'conv_preds');

      // Добавляем пример в классификатор
      classifier.addExample(activation, classId);

      // Очищаем память
      img.dispose();
    }
  };

  // Функция для предсказания
  const predict = async (imageElement:any) => {
    if (net && classifier) {
      const img = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const activation = net.infer(img, 'conv_preds');
      const result = await classifier.predictClass(activation);

      // Обновляем состояние с предсказанием
      setPrediction(result.label);

      // Очищаем память
      img.dispose();
    }
  };

  // Пример обучения классификатора
  const trainClassifier = async () => {
    setTraining(true);

    // Загружаем изображения для обучения
    const class1Image = new Image();
    class1Image.src = 'path/to/class1/image.jpg'; // Замените на путь к изображению
    class1Image.onload = async () => {
      await addExample(class1Image, 'class1');
    };

    const class2Image = new Image();
    class2Image.src = 'path/to/class2/image.jpg'; // Замените на путь к изображению
    class2Image.onload = async () => {
      await addExample(class2Image, 'class2');
      await predict(class2Image.src)
    };

    setTraining(false);
  };

  return (
    <div>
      <h1>KNN Classifier with TensorFlow.js</h1>
      <button onClick={trainClassifier} disabled={training}>
        {training ? 'Training...' : 'Train Classifier'}
      </button>
      <div>
        <h2>Prediction: {prediction}</h2>
      </div>
    </div>
  );
};

export default KNNClassifier;