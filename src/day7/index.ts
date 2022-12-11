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
  parent: CurrentDirectory;
  name: string;
  size?: number;
};

type File = {
  name: string;
  size: number;
};

const isCdHome = (cmd: string) => {
  return cmd === '$ cd /';
};

const isCdDown = (cmd: string) => {
  return cmd.startsWith('$ cd');
};

const isLs = (cmd: string) => {
  return cmd === '$ ls';
};

const isCdUp = (cmd: string) => {
  return cmd === '$ cd ..';
};

const cdHome = (
  i: number,
  currentDir: CurrentDirectory
): [number, CurrentDirectory] => {
  currentDir = root;
  return [i + 1, currentDir];
};

const cdUp = (
  i: number,
  currentDir: CurrentDirectory
): [number, CurrentDirectory] => {
  if (currentDir.parent === null) {
    throw new Error(`already root ${currentDir.name}`);
  }
  currentDir = currentDir.parent;
  return [i + 1, currentDir];
};

const cdDown = (
  i: number,
  currentDir: CurrentDirectory
): [number, CurrentDirectory] => {
  const cmd = inputs[i];
  const cdCmd = cmd.match(/^\$\scd\s(.*)/);
  assert(cdCmd);

  const dirname = cdCmd[1];

  const d = currentDir.directories.find((dir) => {
    return dir.name === dirname;
  });
  assert(d);

  currentDir = d;

  return [i + 1, currentDir];
};

const isDir = (output: string) => {
  return output.startsWith('dir');
};

const createNewDir = (name: string): Directory => {
  return {
    name: name,
    files: [],
    directories: [],
    parent: currentDir,
  };
};

const createNewFile = (name: string, size: number): File => {
  return {
    name,
    size,
  };
};

const ls = (
  currentLine: number,
  currentDir: CurrentDirectory
): [number, CurrentDirectory] => {
  let i = currentLine;

  i++;
  while (inputs[i] && inputs[i][0] !== '$') {
    const input = inputs[i].split(' ');

    if (isDir(input[0])) {
      const d = createNewDir(input[1]);
      currentDir.directories.push(d);
    } else {
      const f = createNewFile(input[1], Number(input[0]));
      currentDir.files.push(f);
    }

    i++;
  }

  return [i, currentDir];
};

const root: RootDirectory = {
  files: [],
  directories: [],
  parent: null,
  name: '/',
};

type CurrentDirectory = Directory | RootDirectory;
let currentDir: CurrentDirectory = root;

let i = 0;

while (i < inputs.length) {
  const input = inputs[i];

  if (isCdHome(input)) {
    [i, currentDir] = cdHome(i, currentDir);
  } else if (isCdUp(input)) {
    [i, currentDir] = cdUp(i, currentDir);
  } else if (isCdDown(input)) {
    [i, currentDir] = cdDown(i, currentDir);
  } else if (isLs(input)) {
    [i, currentDir] = ls(i, currentDir);
  } else {
    throw new Error(`unknown input: ${input}`);
  }
}

console.log(root);

const part1 = () => {
  let res = 0;

  const findTargetDirSize = (d: CurrentDirectory): number => {
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

  console.log('part1: ', res);
};

const part2 = () => {
  const calcDirSize = (d: CurrentDirectory): number => {
    if (d.size !== undefined) {
      return d.size;
    }

    const fSize = d.files.reduce((acc, f) => {
      acc += f.size;
      return acc;
    }, 0);

    const dSize = d.directories.reduce((acc, dir) => {
      acc += calcDirSize(dir);
      return acc;
    }, 0);

    const total = fSize + dSize;
    d.size = total;

    return d.size;
  };

  calcDirSize(root);
  assert(root.size);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const deletingSpace = requiredSpace - (totalSpace - root.size);

  let res = root.size;

  const backtrack = (dir: CurrentDirectory) => {
    assert(dir.size);

    if (dir.size > deletingSpace) {
      assert(dir.size);
      res = Math.min(res, dir.size);
    } else {
      return;
    }

    for (const d of dir.directories) {
      backtrack(d);
    }
  };

  backtrack(root);

  console.log('part2: ', res);
};

part1();
part2();
