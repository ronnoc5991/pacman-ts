import type { Position } from '@/types/Position';
import type { Hitbox } from '@/types/Hitbox';

export const getHitbox = ({ x, y }: Position, size: number): Hitbox => ({
  top: y - size / 2,
  right: x + size / 2,
  bottom: y + size / 2,
  left: x - size / 2,
});
