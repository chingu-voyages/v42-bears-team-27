// Repurposed from https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.spec.ts

import titleCase from './index';

const TEST_CASES: [string, string][] = [
  ['', ''],
  ['2023', '2023'],
  ['test', 'Test'],
  ['two words', 'Two Words'],
  ['one. two.', 'One. Two.'],
  ['a small word starts', 'A Small Word Starts'],
  ['small word ends on', 'Small Word Ends On'],
  ['we keep NASA capitalized', 'We Keep NASA Capitalized'],
  ['pass camelCase through', 'Pass camelCase Through'],
  ['follow step-by-step instructions', 'Follow Step-by-Step Instructions'],
  ['your hair[cut] looks (nice)', 'Your Hair[cut] Looks (Nice)'],
  ['leave Q&A unscathed', 'Leave Q&A Unscathed'],
  [
    'piña colada while you listen to ænima',
    'Piña Colada While You Listen to Ænima',
  ],
  ['start title – end title', 'Start Title – End Title'],
  ['start title–end title', 'Start Title–End Title'],
  ['start title — end title', 'Start Title — End Title'],
  ['start title—end title', 'Start Title—End Title'],
  ['start title - end title', 'Start Title - End Title'],
  ["don't break", "Don't Break"],
  ['"double quotes"', '"Double Quotes"'],
  ['double quotes "inner" word', 'Double Quotes "Inner" Word'],
  ['fancy double quotes “inner” word', 'Fancy Double Quotes “Inner” Word'],
  ['have you read “The Lottery”?', 'Have You Read “The Lottery”?'],
  ['one: two', 'One: Two'],
  ['one two: three four', 'One Two: Three Four'],
  ['one two: "Three Four"', 'One Two: "Three Four"'],
  ['email email@example.com address', 'Email email@example.com Address'],
  ['_underscores around words_', '_Underscores Around Words_'],
  ['*asterisks around words*', '*Asterisks Around Words*'],
  ['this vs. that', 'This vs. That'],
  ['this vs that', 'This vs That'],
  ['this v. that', 'This v. That'],
  ['this v that', 'This v That'],
  [
    'Scott Moritz and TheStreet.com’s million iPhone la-la land',
    'Scott Moritz and TheStreet.com’s Million iPhone La-La Land',
  ],
  [
    'Notes and observations regarding Apple’s announcements from ‘The Beat Goes On’ special event',
    'Notes and Observations Regarding Apple’s Announcements From ‘The Beat Goes On’ Special Event',
  ],
  [
    'the quick brown fox jumps over the lazy dog',
    'The Quick Brown Fox Jumps over the Lazy Dog',
  ],
  ['newcastle upon tyne', 'Newcastle upon Tyne'],
  ['newcastle *upon* tyne', 'Newcastle *upon* Tyne'],
];

describe('titleCase', () => {
  describe('swap case', () => {
    test.each(TEST_CASES)('%s -> %s', (input, result) => {
      expect(titleCase(input)).toBe(result);
    });
  });
});
