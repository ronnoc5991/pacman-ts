import type { WallArgs } from '@/classes/Wall';

export type WallConfig = WallArgs;

export type LevelConfig = {
  wallConfigs: Array<WallConfig>;
};
