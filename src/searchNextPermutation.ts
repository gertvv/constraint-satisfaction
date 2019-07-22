import nextPermutation from './nextPermutation';
import checkSolution from './checkSolution';
import _ from 'lodash';

function* searchNextPermutation(m: number, n: number, constraints: ((sol: number[][]) => boolean)[]) {
  const nextSolution = (sol: number[][]): boolean => {
    for (let i = sol.length - 1; i > 0; --i) {
      if (nextPermutation(sol[i])) return true;
    }
    return false;
  };

  const t0 = Date.now();
  const sol = _.range(n).map(i => _.range(m));
  let i = 0, k = 0;
  do {
    ++i;
    const ok = checkSolution(constraints, sol);
    if (ok) {
      yield sol;
    }
    k += ok ? 1 : 0;
    if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
  } while (nextSolution(sol));
}

export default searchNextPermutation;
