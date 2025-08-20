import type { Grid } from '../types/Grid';
import type { Dimensions } from '../../../types/LevelConfig';

export function getDimensions(grid: Grid): Dimensions {
  return {
    width: grid.length,
    height: grid[0].length,
  };
}
