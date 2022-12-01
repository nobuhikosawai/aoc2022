import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').split('\n');

let total = 0;
const vals = inputs.reduce<number[]>((acc, input) => {
  if (input === '') {
    acc.push(total);
    total = 0;
    return acc;
  }
  total += Number(input);
  return acc;
}, []);

vals.sort((a, b) => b - a);
const res = Array.from({ length: 3 }).reduce<number>((acc, _, i) => {
  acc += vals[i];
  return acc;
}, 0)

console.log(res);
