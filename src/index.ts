import ConstraintDeclaration from './ConstraintDeclaration';
import printSolution from './printSolution';
import { variables, constraintDeclarations } from './luggageProblem';
import makeConstraints from './makeConstraints';

import _ from 'lodash';

// A valid problem will have the same number of values for each variable.
// If n is the number of variables and m the number of values, there are
// (m!)^(n-1) possible solutions. (Keeping the values of the first variable
// fixed, any combination of permutations of the other variables is valid.)

const n = variables.length;
const m = variables[0].values.length;
const constraints = makeConstraints(constraintDeclarations, m);

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

// decodePermutationFactoradic gives the same order as nextPermutation
/*
const sol = _.range(n).map(i => _.range(m));
for (let i = 0; i < 10; ++i) {
  console.log(sol, decodeSolution(i), _.isEqual(sol, decodeSolution(i)));
  nextSolution(sol);
}
*/

const solutionOk = (sol: number[][]): boolean => {
  return _.find(constraints, (c) => c(sol) === false) === undefined;
}

const t0 = Date.now();

/*
let k = 0;
for (let i = 0; i < N; ++i) {
  const sol = decodeSolution(i);
  const ok = solutionOk(sol);
  if (ok) {
    console.log(printSolution(sol) + '\n');
  }
  k += ok ? 1 : 0;
  if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
}
*/

/*
const sol = _.range(n).map(i => _.range(m));
let i = 0, k = 0;
do {
  ++i;
  const ok = solutionOk(sol);
  if (ok) {
    console.log(printSolution(sol) + '\n');
  }
  k += ok ? 1 : 0;
  if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
} while (nextSolution(sol));
console.log(i);
*/

const printSolutionNumeric = (sol: number[][]): string => {
  return JSON.stringify(sol);
};

const sol = _.range(n).map(i => i === 0 ? _.range(m): _.times(m, _.constant(undefined)));
let i = 0, k = 0;
const search = (sol: number[][], h: number) => {
  const clear = (sol: number[][]) => {
    for (let j = h + 1; j < n; ++j) {
      for (let k = 0; k < m; ++k) {
        sol[j][k] = undefined;
      }
    }
  };
  for (let k = 0; k < m; ++k) {
    sol[h][k] = k;
  }
  do {
    clear(sol);
    if (h === n - 1) ++i;
    if (solutionOk(sol)) {
      if (h === n - 1) {
        console.log(printSolution(sol, variables));
        console.log(printSolutionNumeric(sol) + '\n');
        ++k;
      } else search(sol, h + 1);
    }
  } while (nextPermutation(sol[h]));
};
search(sol, 1);
console.log(i, k, N, i / N, (Date.now() - t0));
