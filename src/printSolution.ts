import _ from 'lodash';

const printSolution = (sol: number[][], variables: any): string => {
  const n = sol.length;
  const m = sol[0].length;
  return _.map(_.range(m), (j) => _.map(_.range(n), (i) => variables[i].values[sol[i][j]]).join(', ')).join('\n');
}

export default printSolution;
