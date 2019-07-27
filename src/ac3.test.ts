import ac3 from './ac3';

describe('ac3', () => {
  test('It reduces domains by unary constraints', () => {
    expect(ac3({
      domains: [
        [ 0, 1, 2, 3 ],
        [ 3, 4, 5, 6 ]
      ],
      constraints: [
        {
          variables: [ 0 ],
          relation: [ [ 1 ], [ 3 ] ]
        },
        {
          variables: [ 1 ],
          relation: [ [ 0 ], [ 6 ] ]
        }
      ]
    })).toEqual({
      domains: [
        [ 1, 3 ],
        [ 6 ]
      ],
      constraints: []
    });
  });

  test('It reduces domains by binary constraints', () => {
    const c1 = {
      variables: [ 0, 1 ],
      relation: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]
    };
    expect(ac3({
      domains: [
        [ 1, 2, 3 ],
        [ 1, 2, 3 ]
      ],
      constraints: [ c1 ]
    })).toEqual({
      domains: [
        [ 1, 2 ],
        [ 2, 3 ]
      ],
      constraints: [ c1 ]
    });
  });
});
