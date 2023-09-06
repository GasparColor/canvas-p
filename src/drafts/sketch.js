const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048], // 'A4',
  // orientation: 'landscape', // 'portrait',
  // units: 'cm', // 'in', 'cm',
  // pixelsPerInch: 300, // common value for prints
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'gray';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    // Circle
    context.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'skyblue';
    context.fill();

    // Stroke
    context.lineWidth = width * 0.01;
    context.strokeStyle = 'black';
    context.stroke();
  }};

canvasSketch(sketch, settings);
