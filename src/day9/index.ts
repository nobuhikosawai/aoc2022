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

const isTouching = (h: Coord, t: Coord) => {
  const dx = Math.abs(h[0] - t[0]);
  const dy = Math.abs(h[1] - t[1]);
  return dx >= 0 && dx <= 1 && dy >= 0 && dy <= 1;
};

const isSameY = (h: Coord, t: Coord) => {
  return h[1] === t[1];
};

const isSameX = (h: Coord, t: Coord) => {
  return h[0] === t[0];
};

const moveUp = (knots: Coord[]): Coord[] => {
  knots[0][1] += 1; // moving head

  // follow up tails
  for (let i = 1; i < knots.length; i++) {
    if (isTouching(knots[i - 1], knots[i])) {
      continue;
    }
    knots[i][1] += 1;
    if (!isSameX(knots[i - 1], knots[i])) {
      knots[i][0] = knots[i - 1][0];
    }
  }

  return knots;
};

const moveDown = (knots: Coord[]): Coord[] => {
  knots[0][1] -= 1; // moving head

  // follow up tails
  for (let i = 1; i < knots.length; i++) {
    if (isTouching(knots[i - 1], knots[i])) {
      continue;
    }
    knots[i][1] -= 1;
    if (!isSameX(knots[i - 1], knots[i])) {
      knots[i][0] = knots[i - 1][0];
    }
  }

  return knots;
};

const moveRight = (knots: Coord[]): Coord[] => {
  knots[0][0] += 1; // moving head

  // follow up tails
  for (let i = 1; i < knots.length; i++) {
    if (isTouching(knots[i - 1], knots[i])) {
      continue;
    }
    knots[i][0] += 1;
    if (!isSameY(knots[i - 1], knots[i])) {
      knots[i][1] = knots[i - 1][1];
    }
  }

  return knots;
};

const moveLeft = (knots: Coord[]): Coord[] => {
  knots[0][0] -= 1; // moving head

  // follow up tails
  for (let i = 1; i < knots.length; i++) {
    if (isTouching(knots[i - 1], knots[i])) {
      continue;
    }
    knots[i][0] -= 1;
    if (!isSameY(knots[i - 1], knots[i])) {
      knots[i][1] = knots[i - 1][1];
    }
  }

  return knots;
};

const part1 = () => {
  let knots: [Coord, Coord] = [
    [0, 0],
    [0, 0],
  ];

  const res = new Set<string>([stringifyCoord(knots[knots.length - 1])]);

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

    Array.from({ length: count }).forEach(() => {
      const newKnots = func(knots) as [Coord, Coord];
      knots = newKnots;
      res.add(stringifyCoord(knots[knots.length - 1]));
    });
  });

  console.log(res.size);
};

part1();
