import Constraint from './Constraint';
import csp_eq from './csp_eq';

describe('csp_eq', () => {
  test('It generates unary constraints when the index variable is 0', () => {
    expect(csp_eq(3, 0, 0, 0, 1, 1)).toEqual([
      {
        variables: [ 0 ],
        relation: [
          [ 1 ]
        ]
      }
    ]);

    expect(csp_eq(3, 0, 0, 0, 2, 1)).toEqual([
      {
        variables: [ 3 ],
        relation: [
          [ 1 ]
        ]
      }
    ]);

    expect(csp_eq(5, 0, 0, 0, 2, 1)).toEqual([
      {
        variables: [ 5 ],
        relation: [
          [ 1 ]
        ]
      }
    ]);

    expect(csp_eq(3, 0, 2, 0, 2, 1)).toEqual([
      {
        variables: [ 5 ],
        relation: [
          [ 1 ]
        ]
      }
    ]);

    expect(csp_eq(3, 0, 2, 0, 2, 2)).toEqual([
      {
        variables: [ 5 ],
        relation: [
          [ 2 ]
        ]
      }
    ]);

    expect(csp_eq(3, 0, 1, 1, 2, 2)).toEqual([
      {
        variables: [ 5 ],
        relation: [
          [ 2 ]
        ]
      }
    ]);

    expect(csp_eq(3, 0, 1, 2, 2, 2)).toEqual([
      {
        variables: [ 3 ],
        relation: [
          [ 2 ]
        ]
      }
    ]);
  });

  test('It generates binary constraints when the index variable is not 0', () => {
    const rel0 = [
      [ 0, 0 ],
      [ 1, 1 ],
      [ 1, 2 ],
      [ 2, 1 ],
      [ 2, 2 ]
    ];
    expect(csp_eq(3, 1, 0, 0, 2, 0)).toEqual([
      {
        variables: [ 0, 3 ],
        relation: rel0
      },
      {
        variables: [ 1, 4 ],
        relation: rel0
      },
      {
        variables: [ 2, 5 ],
        relation: rel0
      }
    ]);

    const rel1 = [
      [ 1, 2 ],
      [ 0, 0 ],
      [ 0, 1 ],
      [ 2, 0 ],
      [ 2, 1 ]
    ];
    expect(csp_eq(3, 2, 1, 0, 1, 2)).toEqual([
      {
        variables: [ 3, 0 ],
        relation: rel1
      },
      {
        variables: [ 4, 1 ],
        relation: rel1
      },
      {
        variables: [ 5, 2 ],
        relation: rel1
      }
    ]);
  });

  test('It correctly handles ioff', () => {
    const rel = [
      [ 0, 0 ],
      [ 1, 1 ],
      [ 1, 2 ],
      [ 2, 1 ],
      [ 2, 2 ]
    ];
    expect(csp_eq(3, 1, 0, 1, 2, 0)).toEqual([
      {
        variables: [ 0, 4 ],
        relation: rel
      },
      {
        variables: [ 1, 5 ],
        relation: rel
      },
      {
        variables: [ 2, 3 ],
        relation: rel
      }
    ]);
  });
});
