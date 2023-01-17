import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { fullDateFrom } from '../util/util.js';
import { fullDateTo } from '../util/util.js';

const createAdditionOptionsTemplate = (offers, pointTypeOffers) =>

  pointTypeOffers.offers.map((offer) => {
    const checked = offers.includes(offer.id) ? 'checked' : '';
    return (
      ` <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
                  <label class="event__offer-label" for="event-offer-${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`);
  }).join('');

const createDestinationNameTemplate = (destinations) =>
  destinations.map((destination) =>
    ` <option value="${destination.name}"></option>`
  ).join('');

const createPicturesTemplate = (pictures) =>
  pictures.map((picture) =>
    ` <img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join('');

const createEventTypeItemTemplate = (offersByTypes, type, id) =>

  offersByTypes.map((offer) => {
    const checkedType = offer.type.includes(type) ? 'checked' : '';
    return (
      `<div class="event__type-item">
      <input id="event-type-${offer.type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${checkedType}>
      <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${id}">${offer.type}</label>
    </div>`);
  }).join('');


const createEditPointFormTemplate = (point) => {
  // console.log(point)
  const { basePrice, dateFrom, dateTo, destination, type, offers, id, offerByTypes, offersByTypes, destinations } = point;
  const pointDateTo = fullDateTo(dateTo);
  const pointDateFrom = fullDateFrom(dateFrom);
  const additionOptionsTemplate = createAdditionOptionsTemplate(offers, offerByTypes);
  const picturesTemplate = createPicturesTemplate(destination.pictures);
  const eventTypeItemTemplate = createEventTypeItemTemplate(offersByTypes, type, id);
  const destinationNameTemplate = createDestinationNameTemplate(destinations);

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${eventTypeItemTemplate}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${destinationNameTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${pointDateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${pointDateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                     ${additionOptionsTemplate}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
  );
};

export default class EditPointFormView extends AbstractStatefulView {
  // #point = null;
  #handleFormSubmit = null;
  #handleEditCloseClick = null;

  constructor({point, onFormSubmit, onEditCloseClick}) {
    super();
    // this.#point = point;
    // console.log(point)
    this._setState(EditPointFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditCloseClick = onEditCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseHandler);
    // this.element.querySelector('.event__type-group').addEventListener('click', this.#consoleClick);
    // this.element.querySelector('.event__type').addEventListener('click', this.#eventType);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#eventTypeHandler);
  }

  // #consoleClick = (type, _state) => {
  //   console.log(type)
  //   console.log(this._state)
    // const offerByTypes = this._state.offersByTypes.find((offer) => offer.type === type);
    // console.log(offerByTypes)
    // return offerByTypes;
  // }

  // #eventType = () => {
  //   this.element.querySelectorAll('.event__type-item').addEventListener('click', this.#eventTypeHandler);
  // }


  #eventTypeHandler = (evt) => {
    // console.log(evt.target.previousElementSibling.value);
    // evt.preventDefault()
    this.updateElement({

      type : evt.target.previousElementSibling.value

    });
    console.log(this._state.offersByTypes);
    console.log(this._state.type);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointFormView.parsePointToState(this._state));
  };

  #editCloseHandler = () => {
    this.#handleEditCloseClick();
  };

  static parsePointToState(point) {
    return {...point,
      // isStateType: _state.type === point.type,
      // isDestination: getPointDestination(point),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};


    // delete point.isOfferByType;

    return point;
  }
}
