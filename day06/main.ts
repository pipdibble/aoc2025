const text: string = await Deno.readTextFile('input.txt');
const lines = text.split('').filter(x => /[0-9 \n\+\*]/.test(x)).join('').split('\n');

const totals: Array<number> = lines[0].split(' ').filter(x => !Number.isNaN(parseInt(x))).map(x => parseInt(x));
const operations: Array<string> = lines[lines.length - 1].split(' ').filter(x => x == '+' || x == '*');
if (totals.length != operations.length) {
  throw new Error("First and last line lengths don't! match!");
}

for (let x = 1; x < lines.length - 1; x++) {
  const numLine: Array<number> = lines[x].split(' ').filter(x => !Number.isNaN(parseInt(x))).map(x => parseInt(x));
  totals.forEach((v, i, a) => {
    switch (operations[i]) {
      case '*':
        a[i] = v * numLine[i];
        break;
      case '+':
        a[i] = v + numLine[i];
        break;
      default:
        throw new Error("Unrecognised operation: " + operations[i]);
    }
  });
}

console.log("Part 1 result: " + totals.reduce((a: number, c: number) => {
  return a + c;
}, 0));

let opI = operations.length - 1;
let tempTotal = operations[opI] == '+' ? 0 : 1;
let partTwoTotal = 0;
for (let i = lines[0].length - 1; i >= 0; i--) {
  const numArr = [];
  for (let l = 0; l < lines.length - 1; l++) {
    const op = parseInt(lines[l][i]);
    if (!Number.isNaN(op)) {
      numArr.push(op);
    }
  }
  const num = parseInt(numArr.join(''));
  if (numArr.length == 0 || Number.isNaN(num)) {
    partTwoTotal += tempTotal;
    opI--;
    tempTotal = operations[opI] == '+' ? 0 : 1;
  } else {
    switch (operations[opI]) {
      case '+':
        tempTotal += num;
        break;
      case '*':
        tempTotal *= num;
        break;
      default:
        throw new Error("Unrecognised operation: " + operations[opI]);
    }
  }
}
partTwoTotal += tempTotal;
console.log("Part 2 answer: " + partTwoTotal);