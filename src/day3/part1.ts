import * as fs from 'fs';
import * as path from 'path';

const getPriority = (char: string): number => {
  if (char.match(/[a-z]/)) {
    return char.charCodeAt(0) - 96;
  } else if (char.match(/[A-Z]/)) {
    return char.charCodeAt(0) - 38;
  }
  throw new Error('unknown char');
};

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

const commonChars = inputs.reduce<string[]>((acc, input) => {
  const length = input.length;
  const first = input.slice(0, length / 2);
  const second = input.slice(length / 2);

  const charSet = new Set<string>(first.split(''));

  for (const char of second.split('')) {
    if (charSet.has(char)) {
      acc.push(char); // assume only one common charcter exists.
      break;
    }
  }

  return acc;
}, []);

const res = commonChars.reduce((acc, char) => {
  acc += getPriority(char);
  return acc;
}, 0);

console.log(res);
