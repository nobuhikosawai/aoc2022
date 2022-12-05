import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const getPriority = (char: string): number => {
  if (char.match(/[a-z]/)) {
    return char.charCodeAt(0) - 96;
  } else if (char.match(/[A-Z]/)) {
    return char.charCodeAt(0) - 38;
  }
  throw new Error('unknown char');
};

const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  const set = new Set<T>();
  for (const v of set2.values()) {
    if (set1.has(v)) {
      set.add(v);
    }
  }
  return set;
};

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

let res = 0;
for (let i = 0; i < inputs.length; i += 3) {
  const charSet1 = new Set<string>(inputs[i]);
  const charSet2 = new Set<string>(inputs[i + 1]);
  const charSet3 = new Set<string>(inputs[i + 2]);

  const tmp = intersection(charSet1, charSet2);
  const common = intersection(tmp, charSet3);

  assert(common.size === 1);

  res += getPriority([...common.values()][0]);
}

console.log(res);
