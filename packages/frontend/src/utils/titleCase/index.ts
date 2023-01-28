// Repurposed from https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.ts

const SMALL_WORDS =
  /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
const TOKENS = /[^\s:–—-]+|./g;
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;

export default function titleCase(input: string) {
  let result = '';
  let m: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((m = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = m;

    if (
      // Ignore already capitalized words.
      !IS_MANUAL_CASE.test(token) &&
      // Ignore small words except at beginning or end.
      (!SMALL_WORDS.test(token) ||
        index === 0 ||
        index + token.length === input.length)
    ) {
      // Find and uppercase first word character, skips over *modifiers*.
      result += token.replace(ALPHANUMERIC_PATTERN, (ltr) => ltr.toUpperCase());
      // eslint-disable-next-line no-continue
      continue;
    }

    result += token;
  }

  return result;
}
