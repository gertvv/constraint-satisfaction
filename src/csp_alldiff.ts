import Constraint from './Constraint';
import _ from 'lodash';

const csp_alldiff = (m: number, ivar: number): Constraint[] => {
  const rel = _.filter(_.flatten(_.range(m).map(i => _.range(m).map(c => [i, c]))), ([ival, cval]) => ival !== cval);
  const vars = _.flatten(_.range(m - 1).map(i => _.range(i + 1, m).map(c => [i + ivar * m, c + ivar * m])));
  return vars.map(v => ({
    variables: v,
    relation: rel
  }));
};

export default csp_alldiff;
