import ConstraintDeclaration from './ConstraintDeclaration';
import _ from 'lodash';

const constr_eq = (m: number, ivar: number, ival: number, ioff: number, cvar: number, cval: number) => {
  return (sol: number[][]): boolean => {
    const i = _.findIndex(sol[ivar], (x) => x === ival);
    if (i === undefined) return undefined;
    const v = sol[cvar][(i + ioff) % m];
    return v === undefined ? undefined : v === cval;
  };
};

const constr_nq = (m: number, ivar: number, ival: number, ioff: number, cvar: number, cval: number) => {
  return (sol: number[][]): boolean => {
    const i = _.findIndex(sol[ivar], (x) => x === ival);
    if (i === undefined) return undefined;
    const v = sol[cvar][(i + ioff) % m];
    return v === undefined ? undefined : v !== cval;
  };
};

const makeConstraints = (decls: ConstraintDeclaration[], m: number) => {
  return decls.map(decl => decl[0] == 'eq' ?
    constr_eq(m, decl[1], decl[2], decl[3], decl[4], decl[5]) :
    constr_nq(m, decl[1], decl[2], decl[3], decl[4], decl[5]));
}

export default makeConstraints;
