import Problem from './Problem';
import Constraint from './Constraint';
import _ from 'lodash';

const csp_normalize = (problem: Problem): Problem => {
  const ordered = problem.constraints.map(c => {
    if (c.variables.length == 2 && c.variables[0] > c.variables[1]) {
      return {
        variables: _.reverse(_.clone(c.variables)),
        relation: _.map(c.relation, x => _.reverse(_.clone(x)))
      }
    } else {
      return c;
    }
  });

  const merged = _.map(_.groupBy(ordered, c => JSON.stringify(c.variables)), cs => _.reduce(cs,
    (c1, c2) => ({
      variables: c1.variables,
      relation: _.intersectionBy(c1.relation, c2.relation, JSON.stringify)
    })));

  return {
    domains: problem.domains,
    constraints: merged
  };
};

export default csp_normalize;
