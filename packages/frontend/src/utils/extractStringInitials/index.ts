/**
 * @description Takes a string separated by white space and extracts the first letter of each separated substring
 * @param string
 */

export default function extractStringInitials(string: string) {
  const stringInitials = string
    .split(' ')
    .map((n) => n.charAt(0))
    .join('');

  return stringInitials;
}
