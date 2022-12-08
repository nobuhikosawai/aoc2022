import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .split('');

let left = 0;
let right = 0;

let visited: Map<string, number> = new Map();
while (right < inputs.length && right - left < 14) {
  const char = inputs[right];

  if (visited.has(char)) {
    const newIdx = visited.get(char)! + 1;
    left = Math.max(newIdx, left);
  }

  visited.set(char, right);
  right++;
}

console.log(inputs.splice(left, 14));

console.log(right);
