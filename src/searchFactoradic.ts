import _ from 'lodash';
import checkSolution from './checkSolution';

function* searchFactoradic(m: number, n: number, constraints: ((sol: number[][]) => boolean)[]) {
  const factorial = (n: number): number => {
    return n === 1 ? 1 : n * factorial(n - 1);
  };

  const M = factorial(m);
  const N = Math.pow(M, n - 1);

  const extractVars = (i: number): number[] => {
    const extract = (i: number, t: number): number[] => {
      return t === 0 ? [] : extract(Math.floor(i / M), t - 1).concat([i % M]);
    };
    return extract(i, n);
  };

  const factoradic = (i: number): number[] => {
    const result = [0];
    for (let j = 2; j <= i; ++j) {
      result.unshift(i % j);
      i = Math.floor(i / j);
    }
    result.unshift(i);
    return result;
  };

  const decodePermutation = (i: number): number[] => {
    let f = factoradic(i);
    f = _.times(m - f.length, _.constant(0)).concat(f);
    return f.reduce((acc, i) => acc.concat([_.without(_.range(m), ...acc)[i]]), []);
  };

  const decodeSolution = (i: number): number[][] => {
    return extractVars(i).map(decodePermutation);
  }

  const t0 = Date.now();
  let k = 0;
  for (let i = 0; i < N; ++i) {
    const sol = decodeSolution(i);
    const ok = checkSolution(constraints, sol);
    if (ok) {
      yield sol;
    }
    k += ok ? 1 : 0;
    if (i % 100000 === 0) console.log(`${k} / ${i} = ${k/i} ${i * 1000 / (Date.now() - t0)}`);
  }
};

export default searchFactoradic;
