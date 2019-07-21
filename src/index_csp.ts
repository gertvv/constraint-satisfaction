import Problem from './Problem';
import Constraint from './Constraint';
import csp_eq from './csp_eq';
import csp_nq from './csp_nq';
import csp_alldiff from './csp_alldiff';
import csp_search from './csp_search';
import csp_puzzle from './csp_puzzle';
import printSolution from './printSolution';

import { variables, constraintDeclarations } from './luggageProblem';

import _ from 'lodash';

const n = variables.length;
const m = variables[0].values.length;

const problem: Problem = csp_puzzle(constraintDeclarations, m, n);

const csp_solution = (m: number, sol: number[]): number[][] => {
  return _.concat([_.range(m)], _.chunk(sol, m));
}

const t0 = Date.now();
console.log(csp_search(problem).map(sol => printSolution(csp_solution(m, sol), variables)).join('\n\n'));
console.log(Date.now() - t0);
