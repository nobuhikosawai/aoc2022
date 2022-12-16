import * as fs from 'fs';
import * as path from 'path';

const inputs = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

type Coord = [number, number];
const stringifyCoord = (c: Coord) => {
  return `${c[0]}, ${c[1]}`;
};

let h: Coord = [0, 0],
  t: Coord = [0, 0];

const res = new Set<string>([stringifyCoord(t)]);

const isTouching = () => {
  const dx = Math.abs(h[0] - t[0]);
  const dy = Math.abs(h[1] - t[1]);
  return dx >= 0 && dx <= 1 && dy >= 0 && dy <= 1;
};

const isSameY = () => {
  return h[1] === t[1];
};

const isSameX = () => {
  return h[0] === t[0];
};

const moveUp = () => {
  h[1] += 1;
  if (isTouching()) {
    return;
  }
  t[1] += 1;
  if (!isSameX()) {
    t[0] = h[0];
  }
  res.add(stringifyCoord(t));
};

const moveDown = () => {
  h[1] -= 1;
  if (isTouching()) {
    return;
  }
  t[1] -= 1;
  if (!isSameX()) {
    t[0] = h[0];
  }
  res.add(stringifyCoord(t));
};

const moveRight = () => {
  h[0] += 1;

  if (isTouching()) {
    return;
  }
  t[0] += 1;
  if (!isSameY()) {
    t[1] = h[1];
  }
  res.add(stringifyCoord(t));
};

const moveLeft = () => {
  h[0] -= 1;
  if (isTouching()) {
    return;
  }
  t[0] -= 1;
  if (!isSameY()) {
    t[1] = h[1];
  }
  res.add(stringifyCoord(t));
};

inputs.forEach((input) => {
  const [cmd, args] = input.split(' ');
  const count = Number(args);

  let func:
    | typeof moveUp
    | typeof moveDown
    | typeof moveLeft
    | typeof moveRight;

  switch (cmd) {
    case 'R':
      func = moveRight;
      break;
    case 'L':
      func = moveLeft;
      break;
    case 'U':
      func = moveUp;
      break;
    case 'D':
      func = moveDown;
      break;
  }

  Array.from({ length: count }).forEach(() => func());
});

console.log(res.size);
