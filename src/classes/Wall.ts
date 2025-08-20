import { CollidableObject, CollidableObjectArgs } from './CollidableObject';

export type WallVariant =
  | 'vertical'
  | 'vertical-left-outlined'
  | 'vertical-right-outlined'
  | 'horizontal'
  | 'horizontal-top-outlined'
  | 'horizontal-bottom-outlined'
  | 'top-right-corner'
  | 'top-right-corner-outlined'
  | 'bottom-right-corner'
  | 'bottom-right-corner-outlined'
  | 'bottom-left-corner'
  | 'bottom-left-corner-outlined'
  | 'top-left-corner'
  | 'top-left-corner-outlined';

export type WallArgs = CollidableObjectArgs & {
  variant: WallVariant;
};

export class Wall extends CollidableObject {
  public variant: WallVariant;

  constructor({ variant, ...superArgs }: WallArgs) {
    super(superArgs);
    this.variant = variant;
  }
}
