import { CellValue, cellValueMap } from '../../config/cellValueMap';
import type { AdjacentCell } from '../types/AdjacentCell';
import type { Position } from '../types/Position';

type BorderConfig = {
  originalCellPosition: Position;
  adjacentCellValues: Record<AdjacentCell, CellValue | undefined>;
};

const blockingCellValues = [undefined, cellValueMap.border];

const isBlockingCellValue = (cellValue: CellValue | undefined) =>
  blockingCellValues.includes(cellValue);

export function getBorderCoordinates(grid: Array<Array<CellValue>>) {
  const borderCoordinates: Array<Position> = [];

  grid.forEach((row, rowIndex) => {
    row.map((cellValue, columnIndex) => {
      if (cellValue === cellValueMap.border) {
        const config: BorderConfig = {
          // each cell = 1 unit of space
          // treating top left of grid as origin, we add 0.5 to the indices to get the center of each cell in space
          originalCellPosition: { x: columnIndex + 0.5, y: rowIndex + 0.5 },
          adjacentCellValues: {
            topMiddle: grid[rowIndex - 1]?.[columnIndex],
            topRight: grid[rowIndex - 1]?.[columnIndex + 1],
            middleRight: grid[rowIndex]?.[columnIndex + 1],
            bottomRight: grid[rowIndex + 1]?.[columnIndex + 1],
            bottomMiddle: grid[rowIndex + 1]?.[columnIndex],
            bottomLeft: grid[rowIndex + 1]?.[columnIndex - 1],
            middleLeft: grid[rowIndex]?.[columnIndex - 1],
            topLeft: grid[rowIndex - 1]?.[columnIndex - 1],
          },
        };
        getBorderQuadrants(config).forEach((borderPosition) =>
          borderCoordinates.push(borderPosition),
        );
      }
    });
  });
  console.log(borderCoordinates);
  return borderCoordinates;
}

function isTopLeftQuadrantBlocked({
  middleLeft,
  topLeft,
  topMiddle,
}: BorderConfig['adjacentCellValues']): boolean {
  return [middleLeft, topLeft, topMiddle].every(isBlockingCellValue);
}

function isTopRightQuadrantBlocked({
  topMiddle,
  topRight,
  middleRight,
}: BorderConfig['adjacentCellValues']): boolean {
  return [topMiddle, topRight, middleRight].every(isBlockingCellValue);
}

function isBottomRightQuadrantBlocked({
  middleRight,
  bottomRight,
  bottomMiddle,
}: BorderConfig['adjacentCellValues']): boolean {
  return [middleRight, bottomRight, bottomMiddle].every(isBlockingCellValue);
}

function isBottomLeftQuadrantBlocked({
  bottomMiddle,
  bottomLeft,
  middleLeft,
}: BorderConfig['adjacentCellValues']): boolean {
  return [bottomMiddle, bottomLeft, middleLeft].every(isBlockingCellValue);
}

// TODO: determine better name/division of logic for this?
function getBorderQuadrants({
  originalCellPosition,
  adjacentCellValues,
}: BorderConfig): Array<Position> {
  const blockedQuadrantCoordinates: Array<Position> = [];
  if (isTopLeftQuadrantBlocked(adjacentCellValues)) {
    blockedQuadrantCoordinates.push({
      x: originalCellPosition.x - 0.25,
      y: originalCellPosition.y - 0.25,
    });
  }

  if (isTopRightQuadrantBlocked(adjacentCellValues)) {
    blockedQuadrantCoordinates.push({
      x: originalCellPosition.x + 0.25,
      y: originalCellPosition.y - 0.25,
    });
  }

  if (isBottomRightQuadrantBlocked(adjacentCellValues)) {
    blockedQuadrantCoordinates.push({
      x: originalCellPosition.x + 0.25,
      y: originalCellPosition.y + 0.25,
    });
  }

  if (isBottomLeftQuadrantBlocked(adjacentCellValues)) {
    blockedQuadrantCoordinates.push({
      x: originalCellPosition.x - 0.25,
      y: originalCellPosition.y + 0.25,
    });
  }

  return blockedQuadrantCoordinates;
}
