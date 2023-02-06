import type { CollidableObject } from '@/classes/CollidableObject';
import type { Collision } from '@/types/Collision';

const areCentersColliding = (
  { position: positionOne }: CollidableObject,
  { position: positionTwo }: CollidableObject,
): boolean => positionOne.x === positionTwo.x && positionOne.y === positionTwo.y;

const areEdgesColliding = (
  { hitbox: hitboxOne }: CollidableObject,
  { hitbox: hitboxTwo }: CollidableObject,
): boolean => {
  const areSidesTouching = hitboxOne.right === hitboxTwo.left || hitboxOne.left === hitboxTwo.right;
  const areTopAndBottomTouching =
    hitboxOne.bottom === hitboxTwo.top || hitboxOne.top === hitboxTwo.bottom;
  const areOverlappingOnHorizontalAxis =
    (hitboxOne.left >= hitboxTwo.left && hitboxOne.left <= hitboxTwo.right) ||
    (hitboxOne.right >= hitboxTwo.left && hitboxOne.right <= hitboxTwo.right);
  const areOverlappingOnVerticalAxis =
    (hitboxOne.bottom >= hitboxTwo.top && hitboxOne.bottom <= hitboxTwo.bottom) ||
    (hitboxOne.top >= hitboxTwo.top && hitboxOne.top <= hitboxTwo.bottom);
  return (
    (areSidesTouching && areOverlappingOnVerticalAxis) ||
    (areTopAndBottomTouching && areOverlappingOnHorizontalAxis)
  );
};

const areOccupyingSameCell = (objectOne: CollidableObject, objectTwo: CollidableObject): boolean =>
  Math.floor(objectOne.position.x) === Math.floor(objectTwo.position.x) &&
  Math.floor(objectOne.position.y) === Math.floor(objectTwo.position.y);

export const areObjectsColliding = (
  objectOne: CollidableObject,
  objectTwo: CollidableObject,
  collisionType: Collision,
): boolean => {
  if (collisionType === 'center') return areCentersColliding(objectOne, objectTwo);
  if (collisionType === 'edge') return areEdgesColliding(objectOne, objectTwo);
  if (collisionType === 'sameCell') return areOccupyingSameCell(objectOne, objectTwo);
  return false;
};
