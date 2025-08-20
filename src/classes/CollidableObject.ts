import type { Position } from '@/types/Position';
import type { Hitbox } from '@/types/Hitbox';
import { getHitbox } from '@/utils/getHitbox';

export type CollidableObjectArgs = {
  position: Position;
  size: number;
};

export class CollidableObject {
  public position: Position;
  public size: number;
  public hitbox: Hitbox;

  public constructor({ position, size }: CollidableObjectArgs) {
    this.position = position;
    this.size = size;
    this.hitbox = getHitbox(this.position, this.size);
  }
}
