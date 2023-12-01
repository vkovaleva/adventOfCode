import path from 'path';
import { getInput } from '../helpers';

const input = getInput(path.resolve(__dirname, './input.txt'));

function findNumber(input: string) {
  const r = /\d/g;
  const strArr = input.split('\n');

  return strArr.reduce((sum, current) => {
    const strWithNums = replaceStrWithNums(current);
    const n = strWithNums.match(r);
    if (n) sum += +(n[0] + n[n.length - 1]);
    return sum;
  }, 0);
}

function replaceStrWithNums(str: string) {
  const nums = {
    on1e: 'one',
    t2o: 'two',
    t3e: 'three',
    f4r: 'four',
    f5e: 'five',
    s6x: 'six',
    s7n: 'seven',
    e8t: 'eight',
    n9e: 'nine',
  };
  let strWithNums = str;
  for (const [key, value] of Object.entries(nums)) {
    strWithNums = strWithNums.replaceAll(value, key);
  }

  return strWithNums;
}

console.log(findNumber(input));
