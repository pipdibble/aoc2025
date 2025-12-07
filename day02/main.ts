const text = await Deno.readTextFile('./input.txt');

const checkInvalid = (id: string) => {
  if (id.length % 2 != 0) {
    return false;
  }
  const half = id.length / 2;
  if (id.indexOf(id.slice(half)) == 0) {
    return true;
  }
}

const checkInvalid2 = (id: string) => {
  const half = id.length / 2;
  for (let i = 1; i <= half; i++) {
    const startPattern = id.slice(0, i);
    const remainder = id.replaceAll(startPattern, '');
    if (remainder.length == 0)
      return true;
  }
  return false;
}

const productIdRanges = text.split(',');

type ProductMap = {
  [key: string]: boolean;
}

const invalidMap: ProductMap = {};
const invalidMap2: ProductMap = {};

for (const productIdRange of productIdRanges) {
  const [start, finish] = productIdRange.split('-');
  for (let i = Number(start); i <= Number(finish); i++) {
    if (checkInvalid(i.toString())) {
      invalidMap[i.toString()] = true;
    }
    if (checkInvalid2(i.toString())) {
      invalidMap2[i.toString()] = true;
    }
  }
}

let score1 = 0;
let score2 = 0;

for (const invalidId of Object.keys(invalidMap)) {
  score1 += Number(invalidId);
}
for (const invalidId of Object.keys(invalidMap2)) {
  score2 += Number(invalidId);
}

console.log("Part 1 answer: " + score1);
console.log("Part 2 answer: " + score2);