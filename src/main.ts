// import { Pacman } from "./classes/Pacman";
// import levelConfigs from './config/levels/processed';

// console.log(levelConfigs);

// need to create a loop of sorts
// in the loop we should:
// simulate the game's state
// return that state from the simulation
// pass that state to our renderer to render it?

// const loop = () => {
// requestAnimationFrame(loop);
// console.log('looping');
// }

// loop();
// const pacman = new Pacman({ x: 0, y: 0 }, 10);

// the array tells us where the borders are (in row and column numbers)
// we get those coordinates... what do we do with them next?
// we need to render them, and we need to include them as position that cannot be crossed
// a border is a collidable object
// it has a position, a size, and a hitbox
// in the past, we broke each border into four different quadrants, and determined which quadrants needed to have borders
// so the borders in the initial array were not close to what we needed
export {};
