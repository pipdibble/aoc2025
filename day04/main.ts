const text = await Deno.readTextFile('./input.txt');
const gridSize = text.indexOf('\n') - 1;
const grid = Array.from(text).filter(x => /[\.\@]/.test(x));
let score = 0;
let score2 = 0;

const check = (pos: number) => {
  let hits = 0;
  for (let x = -1; x <= 1 && hits < 4; x++) {
    for (let y = -1; y <= 1 && hits < 4; y++) {
      if (!(x == 0 && y == 0) && !(pos % gridSize == 0 && x == -1) && !((pos + 1) % gridSize == 0 && x == 1)) {
        const np = pos + x + (y * gridSize);
        if (np >= 0 && np < grid.length && grid[np] == '@') {
          hits++;
        }
      }
    }
  }
  return hits < 4;
}

for (let i = 0; i < grid.length; i++) {
  if (grid[i] == '@' && check(i)) {
    score++;
  }
}

const removed: Array<number> = [];
do {
  score2 = removed.length;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] == '@' && check(i)) {
      removed.push(i);
    }
  }
  removed.forEach(i => grid[i] = '.');
} while (score2 != removed.length);

console.log("Part 1 answer: " + score);
console.log("Part 2 answer: " + score2);