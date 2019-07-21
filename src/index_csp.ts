import Problem from './Problem';
import Constraint from './Constraint';
import csp_eq from './csp_eq';
import csp_nq from './csp_nq';
import csp_alldiff from './csp_alldiff';
import csp_search from './csp_search';
import printSolution from './printSolution';
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
  // 1. Het groene stuk bagage, met de naam Molstra, bevindt zich recht tegenover de reiskoffer; ...
  csp_eq(m, 1, 2, 0, 3, 2),
  csp_eq(m, 1, 2, 3, 2, 2),
  // 1. ... dit is niet het rode artikel D.
  csp_eq(m, 0, 3, 0, 1, 4),
  csp_nq(m, 0, 3, 0, 2, 2),
  // 2. Het blauwe stuk bagage ligt direct achter dat van Abby Loftus; ...
  csp_eq(m, 1, 0, 1, 3, 1),
  // 2. ... dit is niet het zwarte, ...
  csp_nq(m, 3, 1, 0, 1, 5),
  // 2. ... dat twee plaatsen voor het bruine voorbijdraait.
  csp_eq(m, 1, 1, 2, 1, 5),
  // 3. De sporttas is van J. Schwartz
  csp_eq(m, 2, 5, 0, 3, 4),
  // 4. De oranje rugzak is niet van Patel
  csp_eq(m, 2, 4, 0, 1, 3),
  csp_nq(m, 2, 4, 0, 3, 3),
  // 5. Artikel C, met het label SWB, is geen reistas
  csp_eq(m, 0, 2, 0, 3, 5),
  csp_nq(m, 0, 2, 0, 2, 3),
  // 6. Bij E ziet u een eenvoudige handkoffer
  csp_eq(m, 0, 4, 0, 2, 0),
  // All different
  csp_alldiff(m, 0),
  csp_alldiff(m, 1),
  csp_alldiff(m, 2),
  csp_alldiff(m, 3),
  csp_alldiff(m, 4),
];

console.log(JSON.stringify(csp_eq(m,1,1,2,1,5)));

const domains = _.times(m * (n - 1), i => _.range(m));

const problem: Problem = {
  domains: domains,
  constraints: _.flatten(constraints)
};

const csp_solution = (m: number, sol: number[]): number[][] => {
  return _.concat([_.range(m)], _.chunk(sol, m));
}

console.log(csp_search(problem).map(sol => printSolution(csp_solution(m, sol), variables)).join('\n\n'));
