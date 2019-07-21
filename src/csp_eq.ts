import Constraint from './Constraint';
import _ from 'lodash';

const csp_eq = (m: number, ivar: number, ival: number, ioff: number, cvar: number, cval: number): Constraint[] => {
  if (ivar === 0) { // unary constraint
    return [{
      variables: [ (cvar - 1) * m + (ival + ioff) % m ],
      relation: [ [ cval ] ]
    }];
  } else { // binary constraint
    const rel = _.concat(
      [[ ival, cval ]],
      _.flatten(_.without(_.range(m), ival).map(i => _.without(_.range(m), cval).map(c => [i, c])))
    );
    return _.range(m).map(i => ({
      variables: [
        (ivar - 1) * m + i,
        (cvar - 1) * m + (i + ioff) % m
      ],
      relation: rel
    }));
  }
}

export default csp_eq;
