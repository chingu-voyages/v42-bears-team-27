// Repurposed from https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.spec.ts

import extractStringInitials from './index';

const TEST_CASES: [string, string][] = [
  ['', ''],
  ['John Smith', 'JS'],
  ['Chief Executive Officer', 'CEO'],
];

describe('extractStringInitials', () => {
  describe('transform case', () => {
    test.each(TEST_CASES)('%s -> %s', (input, result) => {
      expect(extractStringInitials(input)).toBe(result);
    });
  });
});
