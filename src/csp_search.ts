import Problem from './Problem';
import Constraint from './Constraint';
import _ from 'lodash';

export const csp_recurse = (problem: Problem, assigned: number[], found: number[][]): number[][] => {
  if (assigned.length == problem.domains.length) {
    return _.concat(found, [ assigned ]);
  }
  const i = assigned.length;
  console.log(assigned, i);
  for (const val of problem.domains[i]) {
    const assn = [...assigned, val];
    console.log('Checking', assn);
    // check if the new assignment is consistent
    let ok = true;
    for (const constr of problem.constraints) {
      // we check all constraints that (a) include i, and (b) don't include variables past i
      if (_.includes(constr.variables, i) && !_.find(constr.variables, x => x > i)) {
        const sub = _.map(constr.variables, (j) => assn[j]);
        if (!_.find(constr.relation, x => _.isEqual(sub, x))) {
          console.log('Failed', JSON.stringify(constr), sub);
          ok = false;
          break;
        }
      }
    }
    console.log(assn, ok);
    if (ok) {
      found = csp_recurse(problem, assn, found);
    }
  }
  return found;
}

const csp_search = (problem: Problem): number[][] => {
  return csp_recurse(problem, [], []);
}

export default csp_search;
