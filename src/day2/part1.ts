import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').trim().split('\n');

type RPS = 'Rock' | 'Paper' | 'Scissors';

type OPPONENT = 'A' | 'B' | 'C';

const opponentRPS: Record<OPPONENT, RPS> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
}

type YOURS = 'X' | 'Y' | 'Z';
const yourRPS: Record<YOURS, RPS> = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
}

const getWinPoint = (opponent: OPPONENT, yours: YOURS): number => {
  const o = opponentRPS[opponent];
  const y = yourRPS[yours];

  if ((o === 'Rock' && y === 'Paper') || (o === 'Scissors' && y === 'Rock') || (o === 'Paper' && y === 'Scissors')) {
    return 6;
  } else if (o === y) {
    return 3;
  } else {
    return 0;
  }
}

const getHandPoint = (yours: YOURS): number => {
  const y = yourRPS[yours];

  switch (y) {
    case 'Rock':
      return 1;
    case 'Paper':
      return 2;
    case 'Scissors':
      return 3;
  }
}

const res = inputs.reduce((acc, row) => {
  const [opponent, yours] = row.split(' ') as [OPPONENT, YOURS];
  const score = getWinPoint(opponent, yours) + getHandPoint(yours);
  acc += score;

  return acc;
}, 0)

console.log(res)
