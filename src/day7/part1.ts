import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

const inputs: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
  .trim()
  .split('\n');

type RootDirectory = {
  files: File[];
  directories: Directory[]; // TODO: map
  parent: null;
  name: string;
  size?: number;
};

type Directory = {
  files: File[];
  directories: Directory[];
  parent: Directory | RootDirectory;
  name: string;
  size?: number;
};

type File = {
  name: string;
  size: number;
};

// assume that the commands start with root dir
assert(inputs[0] === '$ cd /');

const root = {
  files: [],
  directories: [],
  parent: null,
  name: '/',
};

let currentDir: Directory | RootDirectory = root;

let i = 1;

while (i < inputs.length) {
  const input = inputs[i];

  const cdCmd = input.match(/^\$\scd\s(.*)/);

  if (cdCmd) {
    const dirname = cdCmd[1];

    if (dirname == '..') {
      if (currentDir.parent === null) {
        throw new Error(`already root ${currentDir.name}`);
      }
      currentDir = currentDir.parent;
    } else {
      currentDir = currentDir.directories.find((dir) => {
        return dir.name === dirname;
      })!; // FIXME
    }
    i++;
  } else if (input === '$ ls') {
    i++;
    while (inputs[i] && inputs[i][0] !== '$') {
      const input = inputs[i].split(' ');

      if (input[0] === 'dir') {
        const d: Directory = {
          name: input[1],
          files: [],
          directories: [],
          parent: currentDir,
        };
        currentDir.directories.push(d);
      } else {
        const f: File = {
          name: input[1],
          size: Number(input[0]),
        };
        currentDir.files.push(f);
      }

      i++;
    }
  } else {
    throw new Error(`unknown input: ${input}`);
  }
}

console.log(root);

let res = 0;

const findTargetDirSize = (d: Directory | RootDirectory): number => {
  if (d.size !== undefined) {
    return d.size;
  }

  const fSize = d.files.reduce((acc, f) => {
    acc += f.size;
    return acc;
  }, 0);

  const dSize = d.directories.reduce((acc, dir) => {
    acc += findTargetDirSize(dir);
    return acc;
  }, 0);

  const total = fSize + dSize;
  d.size = total;

  if (total < 100000) {
    res += total;
  }

  return d.size;
};

findTargetDirSize(root);

console.log(res);
