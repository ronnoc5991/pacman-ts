import type { Position } from '@/types/Position';
import type { Hitbox } from '@/types/Hitbox';
import { getHitbox } from '@/utils/getHitbox';

export class CollidableObject {
  public size: number;
  public position: Position;
  public hitbox: Hitbox;

  public constructor(position: Position, size: number) {
    this.size = size;
    this.position = position;
    this.hitbox = getHitbox(this.position, this.size);
  }
}
