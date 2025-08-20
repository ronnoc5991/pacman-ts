import type { LevelConfig } from '@/types/LevelConfig';
import { Wall } from './Wall';

// each characters should have a config object
// we can pass each character that config object on instantiation?
// the positions for each character can only be known by using the level config!!

export default class Game {
  // public score: number = 0;
  // public livesLeft: number = 3;
  public currentLevel: number = 1;
  public currentLevelConfig: LevelConfig;
  public walls: Array<Wall> = [];

  constructor(private readonly levelConfigs: Array<LevelConfig>) {
    this.currentLevelConfig = levelConfigs[this.currentLevel - 1];
    this.createWalls();
  }

  public tick(): void {
    // main function that runs the game
    // updates all state
  }

  private createWalls(): void {
    this.walls = this.currentLevelConfig.wallConfigs.map((wallConfig) => {
      return new Wall(wallConfig);
    });
  }
}
