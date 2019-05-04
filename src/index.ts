import _ from 'lodash';

const variables = [
  {
    "name": "bagage",
    "values": [ "A", "B", "C", "D", "E", "F" ]
  },
  {
    "name": "kleur",
    "values": [ "Blauw", "Bruin", "Groen", "Oranje", "Rood", "Zwart" ]
  },
  {
    "name": "soort",
    "values": [ "Handkoffer", "Plunjezak", "Reiskoffer", "Reistas", "Rugzak", "Sporttas" ]
  },
  {
    "name": "naam",
    "values": [ "Bulhof", "Abby Loftus", "Molstra", "Patel", "J. Schwartz", "SWB" ]
  }
];

// A valid problem will have the same number of values for each variable.
// If n is the number of variables and m the number of values, there are
// (m!)^(n-1) possible solutions. (Keeping the values of the first variable
// fixed, any combination of permutations of the other variables is valid.)

const n = variables.length;
const m = variables[0].values.length;

// !!! Puzzel klopt niet - heeft 11 oplossingen, niet 1
const constraints = [
  (sol: number[][]): boolean => { // 1. Het groene stuk bagage, met de naam Molstra, bevindt zich recht tegenover de reiskoffer; ...
    const i = _.findIndex(sol[1], (x) => x === 2);
    const j = (i + 3) % m;
    return sol[3][i] === 2 && sol[2][j] === 2;
  },
  (sol: number[][]): boolean => { // 1. ... dit is niet het rode artikel D.
    const i = 3;
    return sol[1][i] === 4 && sol[2][i] !== 2;
  },
  (sol: number[][]): boolean => { // 2. Het blauwe stuk bagage ligt direct achter dat van Abby Loftus; ...
    const i = _.findIndex(sol[1], (x) => x === 0);
    const j = (i + 1) % m;
    return sol[3][j] === 1;
  },
  (sol: number[][]): boolean => { // 2. ... dit is niet het zwarte, ...
    const i = _.findIndex(sol[3], (x) => x === 1);
    return sol[1][i] !== 5;
  },
  (sol: number[][]): boolean => { // 2. ... dat twee plaatsen voor het bruine voorbijdraait.
    const i = _.findIndex(sol[1], (x) => x === 1);
    const j = (i + 2) % m;
    return sol[1][j] === 5;
  },
  (sol: number[][]): boolean => { // 3. De sporttas is van J. Schwartz
    const i = _.findIndex(sol[2], (x) => x === 5);
    return sol[3][i] === 4;
  },
  (sol: number[][]): boolean => { // 4. De oranje rugzak is niet van Patel
    const i = _.findIndex(sol[2], (x) => x === 4);
    return sol[1][i] === 3 && sol[3][i] !== 3;
  },
  (sol: number[][]): boolean => { // 5. Artikel C, met het label SWB, is geen reistas
    const i = 2;
    return sol[3][i] === 5 && sol[2][i] !== 3;
  },
  (sol: number[][]): boolean => { // 6. Bij E ziet u een eenvoudige handkoffer
    const i = 4;
    return sol[2][i] === 0;
  },
];

const factorial = (n: number): number => {
  return n === 1 ? 1 : n * factorial(n - 1);
};

const M = factorial(m);
const N = Math.pow(M, n - 1);

const extractVars = (i: number): number[] => {
  const extract = (i: number, t: number): number[] => {
    return t === 0 ? [] : extract(Math.floor(i / M), t - 1).concat([i % M]);
  };
  return extract(i, n);
};

const factoradic = (i: number): number[] => {
  const result = [0];
  for (let j = 2; j <= i; ++j) {
    result.unshift(i % j);
    i = Math.floor(i / j);
  }
  result.unshift(i);
  return result;
};

const decodePermutation = (i: number): number[] => {
  let f = factoradic(i);
  f = _.times(m - f.length, _.constant(0)).concat(f);
  return f.reduce((acc, i) => acc.concat([_.without(_.range(m), ...acc)[i]]), []);
};

const decodeSolution = (i: number): number[][] => {
  return extractVars(i).map(decodePermutation);
}

const nextPermutation = (arr: number[]): boolean => {
  const swap = (arr: any[], i: number, j: number) : void => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const reverse = (arr: any[], i0: number, i1: number): void => {
    if (i1 <= i0) {
      return;
    }
    --i1;
    while (i0 < i1) {
      swap(arr, i0, i1);
      ++i0; --i1;
    }
  };

  const l = arr.length;
  if (l <= 1) return false;

  for (let i = l - 1; i > 0; --i) {
    // find the longest tail of increasing elements
    if (arr[i - 1] < arr[i]) {
      let j = l;
      while (arr[i - 1] >= arr[--j])  {}
      swap(arr, i - 1, j);
      reverse(arr, i, l);
      return true;
    }
  }

  reverse(arr, 0, l);
  return false;
};

const nextSolution = (sol: number[][]): boolean => {
  for (let i = sol.length - 1; i > 0; --i) {
    if (nextPermutation(sol[i])) return true;
  }
  return false;
};

const printSolution = (sol: number[][]): string => {
  return _.map(_.range(m), (j) => _.map(_.range(n), (i) => variables[i].values[sol[i][j]]).join(', ')).join('\n');
};

// decodePermutationFactoradic gives the same order as nextPermutation
/*
const sol = _.range(n).map(i => _.range(m));
for (let i = 0; i < 10; ++i) {
  console.log(sol, decodeSolution(i), _.isEqual(sol, decodeSolution(i)));
  nextSolution(sol);
}
*/

const t0 = Date.now();

/*
let k = 0;
for (let i = 0; i < N; ++i) {
  const sol = decodeSolution(i);
  const ok = _.find(constraints, (c) => !c(sol)) === undefined;
  if (ok) {
    console.log(printSolution(sol) + '\n');
  }
  k += ok ? 1 : 0;
  if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
}
*/

const sol = _.range(n).map(i => _.range(m));
let i = 0, k = 0;
do {
  ++i;
  const ok = _.find(constraints, (c) => !c(sol)) === undefined;
  if (ok) {
    console.log(printSolution(sol) + '\n');
  }
  k += ok ? 1 : 0;
  if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
} while (nextSolution(sol));
console.log(i);
