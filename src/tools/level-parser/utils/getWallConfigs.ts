import type { Grid } from '../types/Grid';
import type { Position } from '../../../types/Position';
import type { WallConfig } from '../../../types/LevelConfig';
import { cellValueMap } from '../config/cellValueMap';
import type { AdjacentCell } from '../types/AdjacentCell';
import type { CellValue } from '../types/CellValue';

// which cells are marked as walls
// divide each of those cells into quadrants
// which of those quadrants require walls
// what type of walls are they?

type AdjacentCells = Record<AdjacentCell, CellValue | undefined>;

type Quadrant = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

type BlockedStatuses = Record<Quadrant, boolean>;

const blockingAdjacentCellValues = [undefined, cellValueMap.wall] as const;

const outlinedAdjacentCellValues = [undefined] as const;

export default function getWallConfigs(grid: Grid): Array<WallConfig> {
  const configs: Array<WallConfig> = [];
  const cellSize = 1; // 1 x 1 square
  const quadrantSize = cellSize / 2; // 0.5 x 0.5 square

  grid.forEach((row, rowIndex) => {
    row.forEach((cellValue, columnIndex) => {
      if (cellValue !== cellValueMap.wall) return;

      const position: Position = { x: columnIndex + 0.5, y: rowIndex + 0.5 };

      const adjacentCells: AdjacentCells = {
        topMiddle: grid[rowIndex - 1]?.[columnIndex],
        topRight: grid[rowIndex - 1]?.[columnIndex + 1],
        middleRight: grid[rowIndex]?.[columnIndex + 1],
        bottomRight: grid[rowIndex + 1]?.[columnIndex + 1],
        bottomMiddle: grid[rowIndex + 1]?.[columnIndex],
        bottomLeft: grid[rowIndex + 1]?.[columnIndex - 1],
        middleLeft: grid[rowIndex]?.[columnIndex - 1],
        topLeft: grid[rowIndex - 1]?.[columnIndex - 1],
      };

      const topQuadrantY = position.y - quadrantSize / 2;
      const bottomQuadrantY = position.y + quadrantSize / 2;
      const leftQuadrantX = position.x - quadrantSize / 2;
      const rightQuadrantX = position.x + quadrantSize / 2;

      const blockedStatuses: BlockedStatuses = {
        topLeft: isTopLeftQuadrantBlocked(adjacentCells),
        topRight: isTopRightQuadrantBlocked(adjacentCells),
        bottomRight: isBottomRightQuadrantBlocked(adjacentCells),
        bottomLeft: isBottomLeftQuadrantBlocked(adjacentCells),
      };

      if (
        blockedStatuses.topLeft &&
        blockedStatuses.topRight &&
        blockedStatuses.bottomRight &&
        blockedStatuses.bottomLeft
      )
        return;

      const isTopLeftOutlined = isTopLeftQuadrantOutlined(adjacentCells);
      const isTopRightOutlined = isTopRightQuadrantOutlined(adjacentCells);
      const isBottomRightOutlined = isBottomRightQuadrantOutlined(adjacentCells);
      const isBottomLeftOutlined = isBottomLeftQuadrantOutlined(adjacentCells);
      const isTopRowOutlined = isTopLeftOutlined && isTopRightOutlined;
      const isBottomRowOutlined = isBottomLeftOutlined && isBottomRightOutlined;
      const isLeftColumnOutlined = isTopLeftOutlined && isBottomLeftOutlined;
      const isRightColumnOutlined = isTopRightOutlined && isBottomRightOutlined;

      if (blockedStatuses.topLeft) {
        // what kind of wall is it?
        const foo = getWallConfig(
          { x: leftQuadrantX, y: topQuadrantY },
          adjacentCells,
          blockedStatuses,
        );
        if (foo) configs.push(foo);
      }
      if (blockedStatuses.topRight) {
        // what kind of wall is it?
        const foo = getWallConfig(
          { x: rightQuadrantX, y: topQuadrantY },
          adjacentCells,
          blockedStatuses,
        );
        if (foo) configs.push(foo);
      }
      if (blockedStatuses.bottomRight) {
        // what kind of wall is it?
        const foo = getWallConfig(
          { x: rightQuadrantX, y: bottomQuadrantY },
          adjacentCells,
          blockedStatuses,
        );
        if (foo) configs.push(foo);
      }
      if (blockedStatuses.bottomLeft) {
        // what kind of wall is it?
        const foo = getWallConfig(
          { x: leftQuadrantX, y: bottomQuadrantY },
          adjacentCells,
          blockedStatuses,
        );
        if (foo) configs.push(foo);
      }
    });
  });

  return configs;
}

function getWallConfig(
  quadrantPosition: Position,
  adjacentCells: AdjacentCells,
  blockedQuadrantStatuses: BlockedStatuses,
): WallConfig | null {
  if (
    isTopLeftCorner(
      blockedQuadrantStatuses.topLeft,
      blockedQuadrantStatuses.topRight,
      blockedQuadrantStatuses.bottomLeft,
      blockedQuadrantStatuses.bottomRight,
      adjacentCells.middleLeft,
      adjacentCells.topMiddle,
    )
  )
    return { position: quadrantPosition, variant: 'top-left-corner', size: 1 };

  if (
    isTopRightCorner(
      blockedQuadrantStatuses.topRight,
      blockedQuadrantStatuses.bottomRight,
      blockedQuadrantStatuses.topLeft,
      blockedQuadrantStatuses.bottomLeft,
      adjacentCells.middleRight,
      adjacentCells.topRight,
    )
  )
    return { position: quadrantPosition, variant: 'top-right-corner', size: 1 };

  if (
    isBottomRightCorner(
      blockedQuadrantStatuses.bottomRight,
      blockedQuadrantStatuses.bottomLeft,
      blockedQuadrantStatuses.topLeft,
      blockedQuadrantStatuses.topRight,
      adjacentCells.middleRight,
      adjacentCells.bottomMiddle,
    )
  )
    return { position: quadrantPosition, variant: 'bottom-right-corner', size: 1 };

  if (
    isBottomLeftCorner(
      blockedQuadrantStatuses.bottomLeft,
      blockedQuadrantStatuses.topRight,
      blockedQuadrantStatuses.topLeft,
      blockedQuadrantStatuses.bottomRight,
      adjacentCells.middleLeft,
      adjacentCells.bottomMiddle,
    )
  )
    return { position: quadrantPosition, variant: 'bottom-left-corner', size: 1 };

  // if (isHorizontalLine(isTopRowBlocked, isBottomRowBlocked, middleLeft, middleRight))
  //   return { position: quadrantPosition, variant: 'horizontal' };

  // if (isVerticalLine(isLeftColumnBlocked, isRightColumnBlocked, topMiddle, bottomMiddle))
  //   return { position: quadrantPosition, variant: 'vertical' };

  return null;
}

function isBlockingAdjacentCellValue(cellValue: CellValue | undefined): boolean {
  return blockingAdjacentCellValues.includes(cellValue);
}

function isTopLeftQuadrantBlocked({ middleLeft, topLeft, topMiddle }: AdjacentCells): boolean {
  return [middleLeft, topLeft, topMiddle].every(isBlockingAdjacentCellValue);
}

function isTopRightQuadrantBlocked({ topMiddle, topRight, middleRight }: AdjacentCells): boolean {
  return [topMiddle, topRight, middleRight].every(isBlockingAdjacentCellValue);
}

function isBottomRightQuadrantBlocked({
  middleRight,
  bottomRight,
  bottomMiddle,
}: AdjacentCells): boolean {
  return [middleRight, bottomRight, bottomMiddle].every(isBlockingAdjacentCellValue);
}

function isBottomLeftQuadrantBlocked({
  bottomMiddle,
  bottomLeft,
  middleLeft,
}: AdjacentCells): boolean {
  return [bottomMiddle, bottomLeft, middleLeft].every(isBlockingAdjacentCellValue);
}

function isOutlinedAdjacentCellValue(cellValue: CellValue | undefined): boolean {
  return outlinedAdjacentCellValues.includes(cellValue);
}

function isTopLeftQuadrantOutlined({ middleLeft, topLeft, topMiddle }: AdjacentCells): boolean {
  return [middleLeft, topLeft, topMiddle].every(isOutlinedAdjacentCellValue);
}

function isTopRightQuadrantOutlined({ topMiddle, topRight, middleRight }: AdjacentCells): boolean {
  return [topMiddle, topRight, middleRight].every(isOutlinedAdjacentCellValue);
}

function isBottomRightQuadrantOutlined({
  middleRight,
  bottomRight,
  bottomMiddle,
}: AdjacentCells): boolean {
  return [middleRight, bottomRight, bottomMiddle].every(isOutlinedAdjacentCellValue);
}

function isBottomLeftQuadrantOutlined({
  bottomMiddle,
  bottomLeft,
  middleLeft,
}: AdjacentCells): boolean {
  return [bottomMiddle, bottomLeft, middleLeft].every(isOutlinedAdjacentCellValue);
}

function isHorizontalLine(
  isTopRowBlocked: boolean,
  isBottomRowBlocked: boolean,
  middleLeft: CellValue | undefined,
  middleRight: CellValue | undefined,
) {
  return (
    (isTopRowBlocked && !isBottomRowBlocked) ||
    (!isTopRowBlocked && isBottomRowBlocked) ||
    (!isTopRowBlocked &&
      !isBottomRowBlocked &&
      isBlockingAdjacentCellValue(middleLeft) &&
      isBlockingAdjacentCellValue(middleRight))
  );
}

function isVerticalLine(
  isLeftColumnBlocked: boolean,
  isRightColumnBlocked: boolean,
  topMiddle: CellValue | undefined,
  bottomMiddle: CellValue | undefined,
) {
  return (
    (isLeftColumnBlocked && !isRightColumnBlocked) ||
    (!isLeftColumnBlocked && isRightColumnBlocked) ||
    (!isLeftColumnBlocked &&
      !isRightColumnBlocked &&
      isBlockingAdjacentCellValue(topMiddle) &&
      isBlockingAdjacentCellValue(bottomMiddle))
  );
}

function isTopLeftCorner(
  isTopLeftQuadrantBlocked: boolean,
  isTopRightQuadrantBlocked: boolean,
  isBottomLeftQuadrantBlocked: boolean,
  isBottomRightQuadrantBlocked: boolean,
  middleLeft: CellValue | undefined,
  topMiddle: CellValue | undefined,
) {
  return (
    (isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked) ||
    (!isTopLeftQuadrantBlocked &&
      isTopRightQuadrantBlocked &&
      isBottomRightQuadrantBlocked &&
      isBottomLeftQuadrantBlocked) ||
    (!isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      isBlockingAdjacentCellValue(middleLeft) &&
      isBlockingAdjacentCellValue(topMiddle))
  );
}

function isTopRightCorner(
  isTopRightQuadrantBlocked: boolean,
  isBottomRightQuadrantBlocked: boolean,
  isTopLeftQuadrantBlocked: boolean,
  isBottomLeftQuadrantBlocked: boolean,
  middleRight: CellValue | undefined,
  topMiddle: CellValue | undefined,
) {
  return (
    (isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      !isTopLeftQuadrantBlocked) ||
    (!isTopRightQuadrantBlocked &&
      isBottomRightQuadrantBlocked &&
      isBottomLeftQuadrantBlocked &&
      isTopLeftQuadrantBlocked) ||
    (!isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      isBlockingAdjacentCellValue(middleRight) &&
      isBlockingAdjacentCellValue(topMiddle))
  );
}

function isBottomRightCorner(
  isBottomRightQuadrantBlocked: boolean,
  isBottomLeftQuadrantBlocked: boolean,
  isTopLeftQuadrantBlocked: boolean,
  isTopRightQuadrantBlocked: boolean,
  middleRight: CellValue | undefined,
  bottomMiddle: CellValue | undefined,
) {
  return (
    (isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      !isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked) ||
    (!isBottomRightQuadrantBlocked &&
      isBottomLeftQuadrantBlocked &&
      isTopLeftQuadrantBlocked &&
      isTopRightQuadrantBlocked) ||
    (!isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      isBlockingAdjacentCellValue(middleRight) &&
      isBlockingAdjacentCellValue(bottomMiddle))
  );
}

function isBottomLeftCorner(
  isBottomLeftQuadrantBlocked: boolean,
  isTopRightQuadrantBlocked: boolean,
  isTopLeftQuadrantBlocked: boolean,
  isBottomRightQuadrantBlocked: boolean,
  middleLeft: CellValue | undefined,
  bottomMiddle: CellValue | undefined,
) {
  return (
    (isBottomLeftQuadrantBlocked &&
      !isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked) ||
    (!isBottomLeftQuadrantBlocked &&
      isTopLeftQuadrantBlocked &&
      isTopRightQuadrantBlocked &&
      isBottomRightQuadrantBlocked) ||
    (!isTopLeftQuadrantBlocked &&
      !isTopRightQuadrantBlocked &&
      !isBottomRightQuadrantBlocked &&
      !isBottomLeftQuadrantBlocked &&
      isBlockingAdjacentCellValue(middleLeft) &&
      isBlockingAdjacentCellValue(bottomMiddle))
  );
}
