import ConstraintDeclaration from './ConstraintDeclaration';
import printSolution from './printSolution';
import { variables, constraintDeclarations } from './luggageProblem';
import makeConstraints from './makeConstraints';

import _ from 'lodash';

const n = variables.length;
const m = variables[0].values.length;
const constraints = makeConstraints(constraintDeclarations, m);

const runTimed = (gen: IterableIterator<number[][]>) => {
  const t0 = Date.now();
  let i = 1;

  for (const sol of gen) {
    console.log(i + '.\n' + printSolution(sol, variables) + '\n');
    ++i;
  }

  console.log(`Runtime ${Date.now() - t0}ms`);
}

// any of these methods expected to give results in the same order
//import search from './searchFactoradic';
//import search from './searchNextPermutation'; // about 40x faster than searchFactoradic
import search from './searchNextPermutation2'; // able to check partial solutions -- many times faster than searchNextPermutation -- expects constraint functions to return undefined when any of the inputs are undefined

runTimed(search(m, n, constraints));

// Naive CSP approach -- about 4x slower than searchNextPermutation2

import csp_search from './csp_search';
import csp_puzzle from './csp_puzzle';

const problem = csp_puzzle(constraintDeclarations, m, n);

const csp_solution = (m: number, sol: number[]): number[][] => {
  return _.concat([_.range(m)], _.chunk(sol, m));
}

function* wrap(gen: IterableIterator<number[]>): IterableIterator<number[][]> {
  for (const sol of gen) {
    yield csp_solution(m, sol);
  }
}

runTimed(wrap(csp_search(problem)));

import csp_normalize from './csp_normalize';
import ac3 from './ac3';

const p = csp_normalize(problem);

runTimed(wrap(csp_search(p)));

console.log(ac3(p).domains);

const q = ac3(p);

runTimed(wrap(csp_search(q)));

function* allInOne() {
  const p = ac3(csp_normalize(problem));
  for (const sol of csp_search(p)) {
    yield csp_solution(m, sol);
  }
}

runTimed(allInOne());
