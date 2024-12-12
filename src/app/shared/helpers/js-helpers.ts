export function getFirstLetters(str:string) {
  const firstLetters = str
    .split(' ')
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join(' ');

  return firstLetters;
}
