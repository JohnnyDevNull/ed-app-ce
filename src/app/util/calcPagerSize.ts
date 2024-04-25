export function calcPagerSize(defaultPagerSize: number): number {
  let pagerSize = defaultPagerSize;

  if (window.innerHeight) {
    pagerSize = Math.floor((window.innerHeight - (2 * 64)) / 64);
  }

  return pagerSize;
}
