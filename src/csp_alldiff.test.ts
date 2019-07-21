import csp_alldiff from './csp_alldiff';

describe('csp_alldiff', () => {
  test('It works', () => {
    const rel = [
      [ 0, 1 ],
      [ 0, 2 ],
      [ 1, 0 ],
      [ 1, 2 ],
      [ 2, 0 ],
      [ 2, 1 ]
    ];
    expect(csp_alldiff(3, 2)).toEqual([
      {
        variables: [ 6, 7 ],
        relation: rel
      },
      {
        variables: [ 6, 8 ],
        relation: rel
      },
      {
        variables: [ 7, 8 ],
        relation: rel
      }
    ]);
  });
});
