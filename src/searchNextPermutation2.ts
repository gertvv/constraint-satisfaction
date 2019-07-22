import nextPermutation from './nextPermutation';
import checkSolution from './checkSolution';
import _ from 'lodash';

function* searchNextPermutation2(m: number, n: number, constraints: ((sol: number[][]) => boolean)[]) {
  const sol = _.range(n).map(i => i === 0 ? _.range(m): _.times(m, _.constant(undefined)));
  function* search(sol: number[][], h: number): IterableIterator<number[][]> {
    const clear = (sol: number[][]) => {
      for (let j = h + 1; j < n; ++j) {
        for (let k = 0; k < m; ++k) {
          sol[j][k] = undefined;
        }
      }
    };
    for (let k = 0; k < m; ++k) {
      sol[h][k] = k;
    }
    do {
      clear(sol);
      if (checkSolution(constraints, sol)) {
        if (h === n - 1) {
          yield sol;
        } else {
          yield* search(sol, h + 1);
        }
      }
    } while (nextPermutation(sol[h]));
  };
  yield* search(sol, 1);
}

export default searchNextPermutation2;
