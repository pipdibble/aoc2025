const text = await Deno.readTextFile('./input.txt');

let dial: number = 50;
let score1: number = 0;
let score2: number = 0;

const rotateLeft = (amount: number) => {
  let val = dial;
  while (amount > 0) {
    amount--;
    val--;
    if (val == -1) {
      val = 99;
    }
    if (val == 0)
      score2++;
  }
  return val;
};

const rotateRight = (amount: number) => {
  let val = dial;
  while (amount > 0) {
    amount--;
    val++;
    if (val == 100) {
      val = 0;
      score2++;
    }
  }
  return val;
};

for (const line of text.split('\n')) {
  const direction: string = line[0];
  const amount = Number(line.slice(1, line.length));
  switch (direction) {
    case 'L':
      dial = rotateLeft(amount);
      break;
    case 'R':
      dial = rotateRight(amount);
      break;
    default:
      throw new Error("Invalid direction found!");
  }
  if (dial == 0) {
    score1++;
  }
}

console.log("Part 1 answer: " + score1);
console.log("Part 2 answer: " + score2);