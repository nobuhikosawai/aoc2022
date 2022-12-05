import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

const res = inputs.reduce((acc, input) => {
  const [first, second] = input.split(',');
  const [l1, h1] = first.split('-').map(Number);
  const [l2, h2] = second.split('-').map(Number);

  if (h2 >= l1 && h1 >= l2) {
    acc++;
  }
  return acc;
}, 0);

console.log(res);
