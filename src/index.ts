import ConstraintDeclaration from './ConstraintDeclaration';
import printSolution from './printSolution';
import { variables, constraintDeclarations } from './luggageProblem';
import makeConstraints from './makeConstraints';

import _ from 'lodash';

const n = variables.length;
const m = variables[0].values.length;
const constraints = makeConstraints(constraintDeclarations, m);

const t0 = Date.now();

// any of these methods expected to give results in the same order
//import search from './searchFactoradic';
//import search from './searchNextPermutation'; // about 40x faster than searchFactoradic
import search from './searchNextPermutation2'; // able to check partial solutions -- many times faster than searchNextPermutation -- expects constraint functions to return undefined when any of the inputs are undefined

for (const sol of search(m, n, constraints)) {
  console.log(printSolution(sol, variables) + '\n');
}

console.log(Date.now() - t0);

// Naive CSP approach -- about 4x slower than searchNextPermutation2

import csp_search from './csp_search';
import csp_puzzle from './csp_puzzle';

const problem = csp_puzzle(constraintDeclarations, m, n);

const csp_solution = (m: number, sol: number[]): number[][] => {
  return _.concat([_.range(m)], _.chunk(sol, m));
}

const t1 = Date.now();

for (const sol of csp_search(problem)) {
  console.log(printSolution(csp_solution(m, sol), variables) + '\n');
}

console.log(Date.now() - t1);
