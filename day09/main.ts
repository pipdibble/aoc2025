const text = await Deno.readTextFile('./input.txt');

interface BoxArea {
  area: number;
  p: number[];
  q: number[];
  r: number[];
  s: number[];
  [_key: string];
}

const grid: Array<Array<number>> = [...text.matchAll(/(\d+),(\d+)/g)]
  .map(v => v.slice(1, 3)
    .map(s => parseInt(s)));
const area_calc = (p: Array<number>, q: Array<number>): BoxArea => {
  const xdiff = Math.abs(p[0] - q[0]) + 1;
  const ydiff = Math.abs(p[1] - q[1]) + 1;
  const r = [p[0], q[1]];
  const s = [q[0], p[1]];
  return { area: xdiff * ydiff, p, q, r, s };
}
const areas: Array<BoxArea> = [];
for (let i = 0; i < grid.length - 1; i++) {
  for (let y = i + 1; y < grid.length; y++) {
    const area = area_calc(grid[i], grid[y]);
    areas.push(area);
  }
}
areas.sort((a, b) => b.area - a.area);
console.log("Part one answer: " + areas[0].area);
interface MinMax {
  yMin: number;
  yMax: number;
}
interface Bin {
  [_key: string]: MinMax;
}
const bins: Bin = {};
const xVals: Array<number> = [];
const copyFill = (source: Array<Array<number>>, dest: Array<Array<number>>): void => {
  for (let i = 0; i < source.length; i++) {
    const sameX = source.filter(v => v[0] == source[i][0]);
    sameX.sort((a, b) => a[1] - b[1]);
    xVals.push(source[i][0]);
    //bins[source[i][0]] = { yMin: sameX[0][1], yMax: sameX[sameX.length - 1][1] };
    for (let y = sameX[0][1]; y <= sameX[sameX.length - 1][1]; y++) {
      if (dest.findIndex(v => v[0] == source[i][0] && v[1] == y) < 0) {
        dest.push([source[i][0], y]);
      }
    }
    const sameY = source.filter(v => v[1] == source[i][1]);
    sameY.sort((a, b) => a[0] - b[0]);
    for (let x = sameY[0][0]; x <= sameY[sameY.length - 1][0]; x++) {
      if (dest.findIndex(v => v[0] == x && v[1] == source[i][1])) {
        dest.push([x, source[i][1]]);
        xVals.push(x);
      }
    }
  }
}

const allowedTiles: Array<Array<number>> = [];
copyFill(grid, allowedTiles);

xVals.forEach(v => {
  const yBox = allowedTiles.filter(a => a[0] == v);
  yBox.sort((a, b) => a[1] - b[1]);
  bins[v.toString()] = { yMin: yBox[0][1], yMax: yBox[yBox.length - 1][1] };
});


let found = false;
let partTwoAnswer: number = -1;
for (let i = 0; i < areas.length && !found; i++) {
  let count = 0;
  for (const key of ['p', 'q', 'r', 's']) {
    const xTest: string = areas[i][key][0].toString();
    const yTest: number = areas[i][key][1];
    if (bins[xTest].yMin <= yTest && bins[xTest].yMax >= yTest)
      count++;
  }
  if (count == 4) {
    found = true;
    partTwoAnswer = i;
  }
}

/*
const allowedTilesCopy: Array<Array<number>> = [...allowedTiles];
copyFill(allowedTilesCopy, allowedTiles);

let found = false;
let partTwoAnswer: number = -1;
for (let i = 0; i < areas.length && !found; i++) {
  let count = 0;
  for (const key of ['p', 'q', 'r', 's']) {
    if (allowedTiles.findIndex(v => v[0] == areas[i][key][0] && v[1] == areas[i][key][1]) >= 0) {
      count++;
    }
  }
  if (count == 4) {
    found = true;
    partTwoAnswer = i;
  }
}
*/
if (partTwoAnswer >= 0)
  console.log('Part two answer: ' + areas[partTwoAnswer].area);