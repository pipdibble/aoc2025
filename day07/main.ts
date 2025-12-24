const text: string = await Deno.readTextFile('./input.txt');

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
const beamMe = (x: number, y: number, p: string, a: Array<string>): Array<string> => {
  if (y >= grid.length || x < 0 || x >= grid[0].length || covered.indexOf(x + ':' + y) >= 0)
    return a.concat([p]);
  covered.push(x + ':' + y);
  p += (">" + x + ":" + y);
  switch (grid[y][x]) {
    case '.': {
      grid[y][x] = '|';
      return a.concat(beamMe(x, ++y, p, a));
    }
    case '^': {
      partOneScore++;
      let retVal = a.concat(beamMe(x - 1, y, p, a));
      retVal = retVal.concat(beamMe(x + 1, y, p, a));
      return retVal;
    }
    default: {
      return a.concat([p]);
    }
  }
};
const routes = beamMe(S[0], S[1] + 1, '', []);
//console.log(routes);

console.log("Part 1 answer: " + partOneScore);
//console.log("Part 2 answer: " + covered.length);