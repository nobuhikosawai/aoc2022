import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .split('\n\n');

const initial = inputs[0].trimEnd().split('\n');
const instructions = inputs[1].trimEnd().split('\n');

const num = initial.pop()!.trim().split('   ').length; // remove number lane

console.log('num', num);

const stack = Array.from({ length: num }).reduce<string[][]>((acc, _) => {
  acc.push([]);
  return acc;
}, []);

initial.forEach((init) => {
  const values = init.replace(/\s{4}/g, ' ').split(' ');

  values.forEach((v, i) => {
    if (v) {
      stack[i].unshift(v);
    }
  });
});

console.log('initial:', stack);

instructions.forEach((instStr) => {
  const inst = instStr.split(' ');

  const moveNum = Number(inst[1]);
  const from = Number(inst[3]) - 1;
  const to = Number(inst[5]) - 1;

  const arr = stack[from];
  const val = arr.splice(arr.length - moveNum);
  stack[to].push(...val);
});

const res = stack.reduce((acc, stack) => {
  const val = stack[stack.length - 1];
  const char = val.match(/\w/);
  if (!!char) {
    acc.push(char[0]);
  }
  return acc;
}, []);

console.log(res.join(''));
