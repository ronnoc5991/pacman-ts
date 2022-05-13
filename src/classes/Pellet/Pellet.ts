import { CollidableObject } from '@/classes/CollidableObject/CollidableObject';
import type { Position } from '@/types/Position';

export class Pellet extends CollidableObject {
  public hasBeenEaten: boolean;
  public isPowerPellet: boolean;

  public constructor(position: Position, size: number, isPowerPellet: boolean = false) {
    super(position, size);
    this.hasBeenEaten = false;
    this.isPowerPellet = isPowerPellet;
  }
}
