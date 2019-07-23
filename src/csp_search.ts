import Problem from './Problem';
import Constraint from './Constraint';
import _ from 'lodash';

function* csp_recurse(problem: Problem, assigned: number[]): IterableIterator<number[]> {
  if (assigned.length == problem.domains.length) {
    yield assigned;
    return;
  }
  const i = assigned.length;
  for (const val of problem.domains[i]) {
    const assn = [...assigned, val];
    // check if the new assignment is consistent
    let ok = true;
    for (const constr of problem.constraints) {
      // we check all constraints that (a) include i, and (b) don't include variables past i
      if (_.includes(constr.variables, i) && !_.find(constr.variables, x => x > i)) {
        const sub = _.map(constr.variables, (j) => assn[j]);
        if (!_.find(constr.relation, x => _.isEqual(sub, x))) {
          ok = false;
          break;
        }
      }
    }
    if (ok) {
      yield* csp_recurse(problem, assn);
    }
  }
}

function* csp_search (problem: Problem) {
  yield* csp_recurse(problem, []);
}

export default csp_search;
