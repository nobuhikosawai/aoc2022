import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

type RPS = 'Rock' | 'Paper' | 'Scissors';

type OPPONENT = 'A' | 'B' | 'C';

const winRPS: Record<RPS, RPS> = {
  Rock: 'Paper',
  Paper: 'Scissors',
  Scissors: 'Rock',
};

const loseRPS: Record<RPS, RPS> = {
  Rock: 'Scissors',
  Paper: 'Rock',
  Scissors: 'Paper',
};

const opponentRPS: Record<OPPONENT, RPS> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

type YOURS = 'X' | 'Y' | 'Z';
type Strategy = 'Win' | 'Draw' | 'Lose';
const yourStrategy: Record<YOURS, Strategy> = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win',
};

const getWinPoint = (o: RPS, y: RPS): number => {
  if (o && y === winRPS[o]) {
    return 6;
  } else if (o === y) {
    return 3;
  } else {
    return 0;
  }
};

const getHandPoint = (y: RPS): number => {
  switch (y) {
    case 'Rock':
      return 1;
    case 'Paper':
      return 2;
    case 'Scissors':
      return 3;
  }
};

const getYourHand = (o: RPS, s: Strategy): RPS => {
  switch (s) {
    case 'Win':
      return winRPS[o];
    case 'Draw':
      return o;
    case 'Lose':
      return loseRPS[o];
  }
};

const res = inputs.reduce((acc, row) => {
  const [opponent, yours] = row.split(' ') as [OPPONENT, YOURS];

  const o = opponentRPS[opponent];
  const y = getYourHand(o, yourStrategy[yours]);

  const score = getWinPoint(o, y) + getHandPoint(y);

  acc += score;

  return acc;
}, 0);

console.log(res);
