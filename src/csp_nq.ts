import Constraint from './Constraint';
import _ from 'lodash';

const csp_nq = (m: number, ivar: number, ival: number, ioff: number, cvar: number, cval: number): Constraint[] => {
  if (ivar === 0) { // unary constraint
    return [{
      variables: [ (cvar - 1) * m + (ival + ioff) % m ],
      relation: _.without(_.range(m), cval).map(x => [ x ])
    }];
  } else { // binary constraint
    const rel = _.filter(_.flatten(_.range(m).map(i => _.range(m).map(c => [i, c]))), el => !_.isEqual(el, [ival, cval]));
    return _.range(m).map(i => ({
      variables: [
        (ivar - 1) * m + i,
        (cvar - 1) * m + (i + ioff) % m
      ],
      relation: rel
    }));
  }
}

export default csp_nq;
