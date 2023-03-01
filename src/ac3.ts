import Problem from './Problem';
import Constraint from './Constraint';
import _ from 'lodash';

// https://www.ics.uci.edu/~dechter/books/chapter03.pdf

const ac3 = (problem: Problem): Problem => {
  const n = problem.domains.length;
  const domains: number[][] = _.cloneDeep(problem.domains);
  // reduce domains by unary constraints
  for (let i = 0; i < problem.domains.length; ++i) {
    for (const constr of problem.constraints) {
      if (_.isEqual(constr.variables, [ i ])) {
        domains[i] = _.intersection(domains[i], _.flatten(constr.relation));
      }
    }
  }

  const relevantConstraints = (i: number, j: number) => _.filter(problem.constraints,
    c => _.isEqual(c.variables, [ i, j ]) || _.isEqual(c.variables, [ j, i ]));

  const revise = (i: number, j: number): boolean => {
    const constraints = relevantConstraints(i, j);
    if (constraints.length == 0) return false;
    if (constraints.length > 1) throw "Multiple constraints!";
    const c = constraints[0];
    const newDomain = _.filter(domains[i], vi => {
      if (c.variables[0] == i) {
        return _.find(c.relation, ([a, b]) => a == vi && _.find(domains[j], vj => vj == b) !== undefined);
      } else {
        return _.find(c.relation, ([b, a]) => a == vi && _.find(domains[j], vj => vj == b) !== undefined);
      }
    }) as number[];
    if (_.isEqual(domains[i], newDomain)) return false;
    domains[i] = newDomain;
    return true;
  };

  // initialize queue of arcs that have constraints
  const queue = _.flatMap(_.range(n), i => 
    _.map(_.without(_.range(n), i), j => [ i, j ])
  ) as [number, number][];

  while (queue.length > 0) {
    const [i, j] = queue.shift();
    if (revise(i, j)) {
      queue.push(...(_.map(_.without(_.range(n), i), k => [k, i]) as [number, number][]));
    }
  }

  return { domains: domains, constraints: _.filter(problem.constraints, c => c.variables.length > 1) };
};

export default ac3;
