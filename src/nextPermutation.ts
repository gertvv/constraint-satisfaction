const nextPermutation = (arr: number[]): boolean => {
  const swap = (arr: any[], i: number, j: number) : void => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const reverse = (arr: any[], i0: number, i1: number): void => {
    if (i1 <= i0) {
      return;
    }
    --i1;
    while (i0 < i1) {
      swap(arr, i0, i1);
      ++i0; --i1;
    }
  };

  const l = arr.length;
  if (l <= 1) return false;

  for (let i = l - 1; i > 0; --i) {
    // find the longest tail of increasing elements
    if (arr[i - 1] < arr[i]) {
      let j = l;
      while (arr[i - 1] >= arr[--j])  {}
      swap(arr, i - 1, j);
      reverse(arr, i, l);
      return true;
    }
  }

  reverse(arr, 0, l);
  return false;
};

export default nextPermutation;
