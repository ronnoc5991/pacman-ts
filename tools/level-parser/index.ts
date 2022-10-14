const fs = require('fs');
import { cellValueMap } from './config/cellValueMap';

const levelConfigsDirectory = '../../src/config/levels';
const rawLevelsDirectory = `${levelConfigsDirectory}/raw`;
const processedLevelsDirectory = `${levelConfigsDirectory}/processed`;

// process each json, extracting the information that we want from it
// create an object with that information
// put that information in a file in ../src/config/levels/processed/0.ts
// ensure that that object conforms to the type of LevelConfig

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

function getBorderCoordinates(grid: Array<Array<string>>) {
  const borders: Array<{ x: number; y: number }> = [];
  grid.forEach((row, rowIndex) => {
    row.map((cellValue, columnIndex) => {
      if (cellValue === cellValueMap.border) {
        // should type out these things
        borders.push({ x: columnIndex, y: rowIndex });
      }
    });
  });
  return borders;
}
