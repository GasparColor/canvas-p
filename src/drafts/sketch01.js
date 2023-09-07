import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  console.log(palette);

  const createGrid = (count, palette) => {
    return Array.from({ length: count }, (_, x) =>
      Array.from( length: count }, (_, y) => {
        const u = count === 1 ? 0.5 : x / (count - 1);
        const v = count === 1 ? 0.5 : y / (count - 1);
        const rotation = random.noise2D(u, v);
  
        return {
          color: random.pick(palette),
          radius: Math.abs(random.noise2D(u, v)) * 0.9,
          position: { u, v },
          rotation,
        };
      })
    ).flat();
  };
gogogogogogogogogogogogogogogogogogogogogogogogogogogogogogo
  const gridSize = 10;

  // random.setSeed('asdf');
  const points = createGrid(gridSize, palette).filter(() => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(({ color, radius, position: { u,v }, rotation }) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
    
      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
    
      // context.fillStyle = color;
      // context.fill();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x,y);
      context.rotate(rotation);
      context.fillText('(-_-)', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
