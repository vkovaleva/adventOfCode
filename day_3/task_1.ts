import path from 'path';
import { getInput } from '../helpers';

const input = getInput(path.resolve(__dirname, './input.txt'));

function getSumOfPartNumbers(input: string): number {
  const strArr = input.split('\n');

  let partsNumbersSum = 0;

  let firstIndex = 0;
  let lastIndex = 0;
  let rowUp = 0;
  let rowDown = 0;

  for (let i = 0; i < strArr.length; i++) {
    rowUp = i - 1;
    rowDown = i + 1;
    let position = 0;
    const numArr = getNumbers(strArr[i]) || '';
    outer: for (let j = 0; j < numArr.length; j++) {
      firstIndex = strArr[i].indexOf(numArr[j], position);
      lastIndex = firstIndex + numArr[j].split('').length;
      position = lastIndex;
      if (firstIndex === 0 && lastIndex < strArr[i].length) {
        if (
          isSpecificSymbolNearby(strArr[i], lastIndex) ||
          isSpecificSymbolInNeighborRows(rowUp, rowDown, strArr, firstIndex, lastIndex)
        ) {
          partsNumbersSum += +numArr[j];
          continue outer;
        }
      } else if (firstIndex > 0 && lastIndex === strArr[i].length - 1) {
        firstIndex = firstIndex - 1;
        if (
          isSpecificSymbolNearby(strArr[i], firstIndex) ||
          isSpecificSymbolInNeighborRows(rowUp, rowDown, strArr, firstIndex, lastIndex - 1)
        ) {
          partsNumbersSum += +numArr[j];
          continue outer;
        }
      } else if (firstIndex > 0 && lastIndex < strArr[i].length) {
        firstIndex = firstIndex - 1;
        if (
          isSpecificSymbolNearby(strArr[i], lastIndex) ||
          isSpecificSymbolNearby(strArr[i], firstIndex) ||
          isSpecificSymbolInNeighborRows(rowUp, rowDown, strArr, firstIndex, lastIndex)
        ) {
          partsNumbersSum += +numArr[j];
          continue outer;
        }
      }
    }
  }

  return partsNumbersSum;
}

function getNumbers(str: string) {
  const num = /\d+/g;
  return str.match(num);
}

function isSpecificSymbolNearby(str: string, index: number) {
  const symbol = str.split('')[index];
  const num = /^[0-9.]+$/g;
  return !symbol.match(num);
}

function isIntervalContainsSpecificSymbol(str: string, firstIndex: number, lastIndex: number) {
  const interval = getSpecifiedInterval(str, firstIndex, lastIndex);
  const num = /^[0-9.]+$/g;
  return !interval.match(num);
}

function getSpecifiedInterval(str: string, firstIndex: number, lastIndex: number) {
  return str
    .split('')
    .slice(firstIndex, lastIndex + 1)
    .join('');
}

function isSpecificSymbolInNeighborRows(
  rowUp: number,
  rowDown: number,
  strArr: Array<string>,
  firstIndex: number,
  lastIndex: number,
) {
  if (rowUp < 0 && rowDown < strArr.length) {
    return isIntervalContainsSpecificSymbol(strArr[rowDown], firstIndex, lastIndex);
  } else if (rowUp >= 0 && rowDown >= strArr.length) {
    return isIntervalContainsSpecificSymbol(strArr[rowUp], firstIndex, lastIndex);
  } else if (rowUp >= 0 && rowDown < strArr.length) {
    return (
      isIntervalContainsSpecificSymbol(strArr[rowDown], firstIndex, lastIndex) ||
      isIntervalContainsSpecificSymbol(strArr[rowUp], firstIndex, lastIndex)
    );
  }
  return false;
}

console.log(getSumOfPartNumbers(input));
