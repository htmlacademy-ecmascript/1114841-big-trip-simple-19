import { getRandomArrayElement } from '../util.js';
import { routPoints } from '../mock/rout-points.js';
import { offersByTypes } from '../mock/additional-options.js';
import { destinations } from '../mock/destinations.js';

const POINT_COUNT = 5;

const getRandomPoint = () => getRandomArrayElement(routPoints);

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;

  get point() {
    return this.#points.map((point) => {
      // const {offers} = point;
      const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
      // point.destination = this.#destinations.find((direction) => direction.id === point.destination);
      // point.destination = pointDestination;
      // const checkedOffer = [];
      // offerByTypes.offers.map((offer) => {
      //   if (offers.includes(offer.id)) {
      //     checkedOffer.push(offer);
      //   }
      // });
      // point.offers = checkedOffer;
      return {
        ...point,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }
}
