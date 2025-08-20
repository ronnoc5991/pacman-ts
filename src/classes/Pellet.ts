import { CollidableObject, CollidableObjectArgs } from './CollidableObject';

export type PelletArgs = CollidableObjectArgs & {
  isPowerPellet: boolean;
};

export class Pellet extends CollidableObject {
  public hasBeenEaten: boolean = false;
  public isPowerPellet: boolean;

  public constructor({ isPowerPellet, ...superArgs }: PelletArgs) {
    super(superArgs);
    this.isPowerPellet = isPowerPellet;
  }
}
