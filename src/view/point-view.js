import {createElement} from '../render.js';
import { dayDate } from '../util.js';
import { dateTimeFrom } from '../util.js';
import { dateTimeTo } from '../util.js';


const createSelectedOffersTemplate = (offers, pointTypeOffers) =>
  pointTypeOffers.offers.map((offer) =>
    offers.includes(offer.id) ?
      ` <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>` : '').join('');


const createPointTemplate = (point, offersByTypes, destinations) => {
  const { basePrice, destination, type, offers, dateTo, dateFrom} = point;
  const pointTimeFrom = dateTimeFrom(dateFrom);
  const pointTimeTo = dateTimeTo(dateTo);
  const pointDayDate = dayDate(dateFrom);
  const pointTypeOffers = offersByTypes.find((offer) => offer.type === point.type);
  const selectOffersTemplate = createSelectedOffersTemplate(offers, pointTypeOffers);
  const pointDestination = destinations.find((direction) => direction.id === destination);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${pointDayDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${`${type } ${ pointDestination.name}`}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${pointTimeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${pointTimeTo}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${selectOffersTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class PointView {
  constructor({point, offersByTypes, destinations}) {
    this.point = point;
    this.offersByTypes = offersByTypes;
    this.destinations = destinations;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.offersByTypes, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
