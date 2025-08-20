export const cellValueMap = {
  wall: 'w',
} as const;

export type CellValue = typeof cellValueMap[keyof typeof cellValueMap];
