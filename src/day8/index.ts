import * as fs from 'fs';
import * as path from 'path';

const inputs: number[][] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n')
  .map((s) => s.split('').map(Number));

const numRow = inputs.length;
const numCol = inputs[0].length;

const part1 = () => {
  const tallestUp = Array.from({ length: numRow }).map(() =>
    Array.from<number>({ length: numCol })
  );
  const tallestDown = Array.from({ length: numRow }).map(() =>
    Array.from<number>({ length: numCol })
  );
  const tallestRight = Array.from({ length: numRow }).map(() =>
    Array.from<number>({ length: numCol })
  );
  const tallestLeft = Array.from({ length: numRow }).map(() =>
    Array.from<number>({ length: numCol })
  );

  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
      const val = inputs[i][j];
      tallestUp[i][j] = i === 0 ? val : Math.max(val, tallestUp[i - 1][j]);
      tallestLeft[i][j] = j === 0 ? val : Math.max(val, tallestLeft[i][j - 1]);
    }
  }

  for (let i = numRow - 1; i > -1; i--) {
    for (let j = 0; j < numCol; j++) {
      const val = inputs[i][j];
      tallestDown[i][j] =
        i === numRow - 1 ? val : Math.max(val, tallestDown[i + 1][j]);
    }
  }

  for (let i = 0; i < numRow; i++) {
    for (let j = numCol - 1; j > -1; j--) {
      const val = inputs[i][j];
      tallestRight[i][j] =
        j === numCol - 1 ? val : Math.max(val, tallestRight[i][j + 1]);
    }
  }

  let res = 0;

  for (let i = 0; i < numRow; i++) {
    for (let j = numCol - 1; j > -1; j--) {
      const val = inputs[i][j];
      if (
        i === 0 ||
        j === 0 ||
        i === numRow - 1 ||
        j === numCol - 1 ||
        val > tallestUp[i - 1][j] ||
        val > tallestDown[i + 1][j] ||
        val > tallestRight[i][j + 1] ||
        val > tallestLeft[i][j - 1]
      ) {
        res++;
      }
    }
  }

  console.log(res);
};

const part2 = () => {
  let res = 0;

  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
      // ignore the edge
      if (i === 0 || j === 0 || i === numRow - 1 || j === numCol - 1) {
        continue;
      }

      const val = inputs[i][j];

      let up = 0;
      let down = 0;
      let right = 0;
      let left = 0;

      for (let x = j - 1; x > -1; x--) {
        left++;
        if (inputs[i][x] >= val) {
          break;
        }
      }
      for (let x = j + 1; x < numCol; x++) {
        right++;
        if (inputs[i][x] >= val) {
          break;
        }
      }
      for (let y = i - 1; y > -1; y--) {
        up++;
        if (inputs[y][j] >= val) {
          break;
        }
      }
      for (let y = i + 1; y < numRow; y++) {
        down++;
        if (inputs[y][j] >= val) {
          break;
        }
      }

      const score = up * down * left * right;
      res = Math.max(res, score);
    }
  }

  console.log(res);
};

part1();
part2();
