const text: string = await Deno.readTextFile('./test_input.txt');

let S: Array<number> = [0, 0];

const grid: Array<Array<string>> = text.split('')
  .filter(x => /[\.S\n\^]/.test(x))
  .join('')
  .split('\n')
  .map((l, i) => {
    const ls = l.split('');
    const s = ls.indexOf('S');
    if (s >= 0)
      S = [s, i];
    return ls;
  });

const covered: Array<string> = [];
let partOneScore = 0;
const beamMe = (x: number, y: number, beamLength: number) => {
  console.log(beamLength);
  if (y >= grid.length || x < 0 || x >= grid[0].length || covered.indexOf(x + ':' + y) >= 0)
    return;
  covered.push(x + ':' + y);
  switch (grid[y][x]) {
    case '.': {
      grid[y][x] = '|';
      beamMe(x, ++y, ++beamLength);
      return;
    }
    case '^': {
      partOneScore++;
      beamLength++;
      beamMe(x - 1, y, beamLength);
      beamMe(x + 1, y, beamLength);
      return;
    }
    default: {
      return;
    }
  }
};
beamMe(S[0], S[1] + 1, 1);

console.log("Part 1 answer: " + partOneScore);