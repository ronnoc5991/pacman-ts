import type { Direction } from '@/types/Direction';
import type { PositionValidator } from '@/types/PositionValidator';
import { CollidableObject, CollidableObjectArgs } from './CollidableObject';

export type CharacterArgs = CollidableObjectArgs & {
  stepSize: number;
  baseVelocity: number;
  isValidPosition: PositionValidator;
};

export class Character extends CollidableObject {
  public direction: Direction = 'left';
  private readonly stepProgress: number = 0;
  private readonly stepSize: number;
  private readonly baseVelocity: number;
  private readonly isValidPosition: PositionValidator;

  public constructor({ baseVelocity, isValidPosition, stepSize, ...superArgs }: CharacterArgs) {
    super(superArgs);
    this.stepSize = stepSize;
    this.baseVelocity = baseVelocity;
    this.isValidPosition = isValidPosition;
  }

  public tick(): void {
    // this can be called from game
    // we update our position if possible here
  }

  protected step(): void {
    // calculate next position
    // see if it is a valid position
    // if it is valid, update position to that position
    // if not, pacman does nothing
    // ghosts change direction?
  }

  protected changeDirection(direction: Direction): void {
    this.direction = direction;
  }
}
