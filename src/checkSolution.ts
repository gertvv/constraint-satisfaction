import _ from 'lodash';

const checkSolution = (constraints: ((sol: number[][]) => boolean)[], sol: number[][]): boolean => {
  return _.find(constraints, (c) => c(sol) === false) === undefined;
}

export default checkSolution;
