const text = await Deno.readTextFile('./input.txt');

const biggestJoltage = (bank: Array<string>) => {
  let biggy: number = Number(bank[0] + '' + bank[1]);
  for (let i = 0; i < bank.length - 1; i++) {
    for (let x = i + 1; x < bank.length; x++) {
      const temp: number = Number(bank[i] + '' + bank[x]);
      if (temp > biggy) {
        biggy = temp;
      }
      if (biggy == 99) {
        return biggy;
      }
    }
  }
  return biggy;
}

const biggestJoltage2 = (bank: Array<string>) => {
  const retVal: Array<string> = [];
  let index: number = 0;
  while (retVal.length < 12 && index < bank.length) {
    const bankSlice = bank.slice(index, bank.length - (11 - retVal.length)).sort((a, b) => Number(b) - Number(a));
    retVal.push(bankSlice[0]);
    index = bank.indexOf(bankSlice[0], index) + 1;
  }
  return Number(retVal.join(''));
}

let score1 = 0;
let score2 = 0;

for (const bank of text.split('\n')) {
  const bankArr = Array.from(bank).filter(x => /[1-9]/.test(x));
  score1 += biggestJoltage(bankArr);
  score2 += biggestJoltage2(bankArr)
}

console.log("Part 1 answer: " + score1);
console.log("Part 2 answer: " + score2);