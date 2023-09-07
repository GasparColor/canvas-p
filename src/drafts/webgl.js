// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
import palettes from 'nice-color-palettes';

import { random } from 'canvas-sketch-util';

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [ 512, 512 ],
  fps: 24, // 24 is good for GIF's , and 30 for extra-quallity 
  diration: 4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("gray", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(1,1,1);
  const materialColor = (color) => new THREE.MeshStandardMaterial({
    color,
  })

  const randomColor = () => random.pick(random.pick(palettes));

  for (let i = 0; i < 40; i++) {
    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(
      geometry,
      materialColor(randomColor()),
    );

    mesh.position.set(
      random.range(-1,1), // x
      random.range(-1,1), // y
      random.range(-1,1), // z
    );

    mesh.scale.set(
      random.range(-1,1), // x
      random.range(-1,1), // y
      random.range(-1,1), // z
    );

    mesh.scale.multiplyScalar(0.5);
    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight('hsl(0, 0%, 40%)'));

  const light = new THREE.DirectionalLight('white', 1);
  // light.position.set(2, 2, 4);
  light.position.set(0, 0, 4);
  scene.add(light);
  

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      scene.rotation.y = time;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
