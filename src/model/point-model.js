import { getRandomArrayElement } from '../util.js';
import { routPoints } from '../mock/rout-points.js';
import { offersByTypes } from '../mock/additional-options.js';
import { destinations } from '../mock/destinations.js';
import { nanoid } from 'nanoid';

const POINT_COUNT = 5;

const getRandomPoint = () => ({
  id:nanoid(),
  ...getRandomArrayElement(routPoints)});

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;

  get point() {
    return this.#points.map((point) => {
      const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
      const destination = this.#destinations.find((direction) => direction.id === point.destination);
      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }
}
