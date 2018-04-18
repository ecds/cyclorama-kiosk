import { helper } from '@ember/component/helper';

export function doughnut(hotSpotPolygon) {
  return [[[-55, 170],[-55, -170],[55, -170],[55, 170]], hotSpotPolygon];
}

export default helper(doughnut);
