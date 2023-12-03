import path from 'path';
import { getInput } from '../helpers';

const input = getInput(path.resolve(__dirname, './input.txt'));

function findSumOfPowers(input: string): number {
  const strArr = input.split('\n');
  let powerSum = 0;

  for (let i = 0; i < strArr.length; i++) {
    const sets = strArr[i].split(':')[1];
    powerSum += getSetPower(sets);
  }
  return powerSum;
}

function getSetPower(cubeSet: string): number {
  const num = /\d+/g;
  const cubes: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const [key] of Object.entries(cubes)) {
    const numbersOfDefiniteColor = cubeSet
      .match(new RegExp('\\b\\d+\\s' + key + '\\b', 'g'))
      ?.toString()
      .match(num)
      ?.map((current) => Number(current));
    cubes[key] = Math.max(...(numbersOfDefiniteColor || []));
  }
  return Object.values(cubes).reduce((power, current) => power * current, 1);
}

console.log(findSumOfPowers(input));
