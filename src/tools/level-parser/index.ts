import fs from 'fs';
import type { Grid } from './types/Grid';
import type { LevelConfig } from '../../types/LevelConfig';
import getWallConfigs from './utils/getWallConfigs';

const levelConfigsDirectory = './src//config/levels';
const rawLevelsDirectory = `${levelConfigsDirectory}/raw`;
const processedLevelsDirectory = `${levelConfigsDirectory}/processed`;

const numberOfRawLevelConfigs = fs.readdirSync(rawLevelsDirectory).length;

Array.from({ length: numberOfRawLevelConfigs }).forEach((_, index) => {
  try {
    const data = fs.readFileSync(`${rawLevelsDirectory}/${index}.json`, { encoding: 'utf-8' });
    const grid: Grid = JSON.parse(data);

    const levelConfig: LevelConfig = {
      wallConfigs: getWallConfigs(grid),
    };
    fs.writeFileSync(`${processedLevelsDirectory}/${index}.json`, JSON.stringify(levelConfig));
  } catch (err) {
    console.error(err);
  }
});

const getLevelConfigName = (levelNumber: number) => `level${levelNumber}`;

const getImportStatement = (fileNumber: number) =>
  `import ${getLevelConfigName(fileNumber)} from './${fileNumber}.json';\n`;

const importStatements = Array.from({ length: numberOfRawLevelConfigs })
  .map((_, index) => getImportStatement(index))
  .join('');

const levelConfigs = Array.from({ length: numberOfRawLevelConfigs }).map((_, index) =>
  getLevelConfigName(index),
);

const exportStatement = `export default [${levelConfigs}];`;

const content = `${importStatements}\n${exportStatement}`;

fs.writeFileSync(`${processedLevelsDirectory}/index.ts`, content);
