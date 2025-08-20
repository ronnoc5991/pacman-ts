import type { Direction } from '@/types/Direction';
import { Character, CharacterArgs } from './Character';

export default class Player extends Character {
  private nextDirection: Direction;

  public constructor(superArgs: CharacterArgs) {
    super(superArgs);
    this.initialize();
    this.nextDirection = this.direction;
  }

  private initialize(): void {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.nextDirection = 'up';
          break;
        case 'ArrowRight':
          this.nextDirection = 'right';
          break;
        case 'ArrowDown':
          this.nextDirection = 'down';
          break;
        case 'ArrowLeft':
          this.nextDirection = 'left';
          break;
        default:
          // do nothing
          break;
      }
    });
  }

  public step(): void {
    // check if we can go in the nextDirection
    // if yes, changeDirection to nextDirection
    // calculate the nextPosition of this character based on velocity/direction/size
    // see if that is a valid position
    // if yes, go there (update position), if no, don't
  }
}
