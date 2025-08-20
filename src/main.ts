import Game from './classes/Game';
import Renderer from './classes/Renderer';
import levelConfigs from './config/levels/processed';

const root = document.getElementById('root') as HTMLElement;

const game = new Game(levelConfigs);
const renderer = new Renderer(root, game);

const framesPerSecond = 60;
const interval = 1000 / framesPerSecond;
let previousTime: number;

const loop = () => {
  const now = Date.now();

  if (!previousTime) previousTime = now;

  if (now - previousTime >= interval) {
    game.tick();
    renderer.render(); // renderer.renderFrame()?
    previousTime = now;
  }

  requestAnimationFrame(loop);
};

loop();
