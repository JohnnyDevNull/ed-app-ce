export function calcPagerSize(defaultPagerSize: number): number {
  let pagerSize = defaultPagerSize;

  if (window.screen.height) {
    pagerSize = Math.floor((window.screen.height - (3 * 64)) / 64);
  }

  return pagerSize;
}
