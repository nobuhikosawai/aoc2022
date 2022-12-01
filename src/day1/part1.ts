import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').split('\n');

let total = 0;
let max = 0;
inputs.forEach((input) => {
  if (input === '') {
    max = Math.max(max, total);
    total = 0;
  }
  total += Number(input);
});

console.log(max);
