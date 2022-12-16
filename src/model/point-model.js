import {getRandomPoint} from '../mock/local-points.js';

const POINT_COUNT = 5;

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoint() {
    return this.points;
  }
}
// const pointTypeOffer = offerByTypes.find((offer) => offer.type === routPoints.type);

// pointTypeOffer(offerByTypes[0])


// console.log(pointTypeOffer)

// const pointTypeOffer = offerByTypes.find((offer) =>offer.type === localPoints.type);

// for (const offers of localPoints) {
//   if offers.type =
//   console.log(offerType);
// }

// console.log(pointTypeOffer)

