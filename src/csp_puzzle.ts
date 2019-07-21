import ConstraintDeclaration from './ConstraintDeclaration';
import Problem from './Problem';
import csp_eq from './csp_eq';
import csp_nq from './csp_nq';
import csp_alldiff from './csp_alldiff';

import _ from 'lodash';

const csp_puzzle = (decls: ConstraintDeclaration[], m: number, n: number): Problem => {
  const c1 = decls.map(decl => decl[0] == 'eq' ?
    csp_eq(m, decl[1], decl[2], decl[3], decl[4], decl[5]) :
    csp_nq(m, decl[1], decl[2], decl[3], decl[4], decl[5]));
  const c2 = _.range(m).map(i => csp_alldiff(m, i));
  return {
    "domains": _.times(m * (n - 1), i => _.range(m)),
    "constraints":_.flatten(_.concat(c1, c2))
  };
}

export default csp_puzzle;
