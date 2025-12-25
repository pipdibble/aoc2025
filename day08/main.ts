const text: string = await Deno.readTextFile('./input.txt');
const coordinates: Array<Array<number>> = [...text.matchAll(/(\d+),(\d+),(\d+)/g)]
  .map(v => [parseInt(v[1]), parseInt(v[2]), parseInt(v[3])]);
const X = 0;
const Y = 1;
const Z = 2;
const temp_strings = prompt("Number of strings: ");
const STRINGS = temp_strings != null ? parseInt(temp_strings) : 1000;
const MULTIPLES = 3;
const euclidian_distance = (p: Array<number>, q: Array<number>): number => {
  let e1 = (p[X] - q[X]);
  e1 *= e1;
  let e2 = (p[Y] - q[Y]);
  e2 *= e2;
  let e3 = (p[Z] - q[Z]);
  e3 *= e3;
  return Math.sqrt(e1 + e2 + e3);
}

const distances: Array<Array<number>> = [];
for (let o: number = 0; o < coordinates.length - 1; o++) {
  const origin = coordinates[o];
  for (let d: number = o + 1; d < coordinates.length; d++) {
    const destination = coordinates[d];
    const distance = euclidian_distance(origin, destination);
    distances.push([distance, o, d]);
  }
}
distances.sort((a, b) => a[0] - b[0]);

const circuits: Array<Array<number>> = [];
coordinates.forEach((_v, i) => circuits.push([i]));

for (let d = 0; d < STRINGS; d++) {
  const c1 = circuits.findIndex((v) => v.indexOf(distances[d][1]) >= 0);
  const c2 = circuits.findIndex((v) => v.indexOf(distances[d][2]) >= 0);
  if (c1 >= 0 && c2 >= 0 && c1 != c2) {
    circuits[c1] = circuits[c1].concat(circuits[c2]);
    circuits.splice(c2, 1);
  } else {
    // console.log("DO NOTHING", coordinates[distances[d][1]], coordinates[distances[d][2]]);
  }
}
circuits.sort((a, b) => b.length - a.length);
let partOneAnswer = 1;
for (let i = 0; i < MULTIPLES; i++) {
  partOneAnswer *= circuits[i].length;
}
console.log("Part one answer: " + partOneAnswer);

let d = STRINGS;
let coord1 = coordinates[distances[d][1]];
let coord2 = coordinates[distances[d][2]];
while (circuits.length > 1) {
  const c1 = circuits.findIndex((v) => v.indexOf(distances[d][1]) >= 0);
  const c2 = circuits.findIndex((v) => v.indexOf(distances[d][2]) >= 0);
  if (c1 >= 0 && c2 >= 0 && c1 != c2) {
    circuits[c1] = circuits[c1].concat(circuits[c2]);
    circuits.splice(c2, 1);
  } else {
    // console.log("DO NOTHING", coordinates[distances[d][1]], coordinates[distances[d][2]]);
  }
  coord1 = coordinates[distances[d][1]];
  coord2 = coordinates[distances[d][2]];
  d++;
}
console.log(coord1, coord2);
console.log("Part two answer: " + coord1[X] * coord2[X]);