import csp_normalize from './csp_normalize';
import _ from 'lodash';

describe('csp_normalize', () => {
  test('It puts variables in order', () => {
    const input = {
      domains: [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ],
      constraints: [
        {
          variables: [ 1, 0 ],
          relation: [
            [ 4, 1 ],
            [ 5, 2 ],
            [ 6, 3 ]
          ]
        }
      ]
    };
    const copy = _.cloneDeep(input);
    expect(csp_normalize(input)).toEqual({
      domains: [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ],
      constraints: [
        {
          variables: [ 0, 1 ],
          relation: [
            [ 1, 4 ],
            [ 2, 5 ],
            [ 3, 6 ]
          ]
        }
      ]
    });
    expect(input).toEqual(copy);
  });

  test('It merges constraints on the same variables', () => {
    const input = {
      domains: [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ],
      constraints: [
        {
          variables: [ 1, 0 ],
          relation: [
            [ 4, 1 ],
            [ 5, 2 ],
            [ 6, 3 ]
          ]
        }, {
          variables: [ 0, 1 ],
          relation: [
            [ 1, 4 ],
            [ 1, 5 ],
            [ 1, 6 ]
          ]
        }
      ]
    };
    const copy = _.cloneDeep(input);
    expect(csp_normalize(input)).toEqual({
      domains: [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ],
      constraints: [
        {
          variables: [ 0, 1 ],
          relation: [
            [ 1, 4 ]
          ]
        }
      ]
    });
    expect(input).toEqual(copy);
  });
});
