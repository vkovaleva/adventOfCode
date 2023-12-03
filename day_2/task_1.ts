import path from 'path';
import { getInput } from '../helpers';

const input = getInput(path.resolve(__dirname, './input.txt'));

function findIsSum(input: string) {
  const strArr = input.split('\n');
  let idSum = 0;

  outer: for (let i = 0; i < strArr.length; i++) {
    const idPlusSets = strArr[i].split(':');
    const id = idPlusSets[0].split(' ')[1];
    const sets = idPlusSets[1].split(';');

    for (let i = 0; i < sets.length; i++) {
      if (isCubeNumberOutOfRange(sets[i])) continue outer;
    }
    idSum += +id;
  }
  return idSum;
}

function isCubeNumberOutOfRange(cubeSet: string): boolean {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  for (const [key, value] of Object.entries(cubes)) {
    const numberOfDefiniteColor = cubeSet
      .match(new RegExp('\\b\\d+\\s' + key + '\\b', 'g'))
      ?.toString()
      .split(' ')[0];
    if (numberOfDefiniteColor && +numberOfDefiniteColor > value) return true;
  }
  return false;
}

console.log(findIsSum(input));
