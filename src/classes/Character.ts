import type { Direction } from '@/types/Direction';
import type { Position } from '@/types/Position';
import { CollidableObject } from './CollidableObject';

export class Character extends CollidableObject {
  public direction: Direction;

  public constructor(position: Position, size: number) {
    super(position, size);
    this.direction = 'left'; // TODO: See if this is appropriate for all characters
  }

  protected changeDirection(direction: Direction): void {
    this.direction = direction;
  }
}
