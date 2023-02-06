const fs = require('fs');
import { getBorderCoordinates } from './src/utils/getBorderCoordinates';

const levelConfigsDirectory = '../../src/config/levels';
const rawLevelsDirectory = `${levelConfigsDirectory}/raw`;
const processedLevelsDirectory = `${levelConfigsDirectory}/processed`;

const numberOfRawLevelConfigs = fs.readdirSync(rawLevelsDirectory).length;

Array.from({ length: numberOfRawLevelConfigs }).forEach((_, index) => {
  try {
    const data = fs.readFileSync(`${rawLevelsDirectory}/${index}.json`);
    const parsedData = JSON.parse(data);

    const processedData = {
      borders: getBorderCoordinates(parsedData),
    };
    // TODO: given this data, we need to create the functions that parse the data
    fs.writeFileSync(`${processedLevelsDirectory}/${index}.json`, JSON.stringify(processedData));
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

const exportStatment = `export default [${levelConfigs}];`;

const content = `${importStatements}\n${exportStatment}`;

fs.writeFileSync(`${processedLevelsDirectory}/index.ts`, content);
