const text: string = await Deno.readTextFile('./input.txt');

type IngredientRange = {
  start: number;
  end: number;
};

const IDRanges: Array<IngredientRange> = [];

const fresh: Array<number> = [];

text.split('\n').forEach(line => {
  const sanitisedLine = Array.from(line).filter(c => /[\d-]/.test(c)).join('');
  if (/\d+-\d+/.test(sanitisedLine)) {
    const slr: RegExpMatchArray | null = sanitisedLine.match(/(\d+)-(\d+)/);
    if (slr == null) {
      throw new Error("Line not recognised! " + sanitisedLine);
    } else {
      IDRanges.push({ start: Number(slr[1]), end: Number(slr[2]) });
    }
  } else if (/\d+/.test(sanitisedLine)) {
    let found = false;
    const id: number = Number(sanitisedLine);
    for (let i = 0; i < IDRanges.length && !found; i++) {
      if (id >= IDRanges[i].start && id <= IDRanges[i].end) {
        fresh.push(id);
        found = true;
      }
    }
  }
});

let start: number | null = null;
let score2: number = 0;
IDRanges.sort((a, b) => a.start - b.start).forEach((range => {
  start = start == null || (range.start > start) ? range.start : start;
  if (start <= range.end) {
    score2 += (range.end - start) + 1;
    console.log(start, '-', range.end, score2);
    start = range.end + 1;
  }
}));

console.log("Day 5 part 1 answer: " + fresh.length);
console.log("Day 5 part 2 answer: " + score2);