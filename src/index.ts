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


const printSolutionNumeric = (sol: number[][]): string => {
  return JSON.stringify(sol);
};

//console.log(i, k, N, i / N, (Date.now() - t0));

const t0 = Date.now();

//import search from './searchFactoradic';
//import search from './searchNextPermutation'; // about 40x faster than searchFactoradic
import search from './searchNextPermutation2'; // able to check partial solutions -- many times faster than searchNextPermutation

for (const sol of search(m, n, constraints)) {
  console.log(printSolution(sol, variables) + '\n');
}

console.log(Date.now() - t0);
