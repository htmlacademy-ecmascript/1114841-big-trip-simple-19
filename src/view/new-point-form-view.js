import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { fullDateFrom, fullDateTo, firstLetterUp } from '../util/util.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 5000,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: {
    id: 3,
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix parliament building'
      }
    ]
  },
  destinations: [
    {
      id: 1,
      description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      name: 'Chamonix',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        }
      ]
    },
    {
      id: 2,
      description: 'Amsterdam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=11',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=12',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=13',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=14',
          description: 'Chamonix parliament building'
        }
      ]
    },
    {
      id: 3,
      description: 'Geneva. Cras aliquet varius magna, non porta ligula feugiat eget.',
      name: 'Geneva',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=21',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=22',
          description: 'Chamonix parliament building'
        }
      ]
    }
  ],
  offers: [],
  offersByTypes: [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 300
        },
        {
          id: 2,
          title: 'Additional passenger',
          price: 50
        },
        {
          id: 3,
          title: 'Select Radio',
          price: 10
        },
        {
          id: 4,
          title: 'Open a window',
          price: 5
        }
      ]
    },
    {
      type: 'bus',
      offers: [
        {
          id: 1,
          title: 'Take an extra seat',
          price: 80
        },
        {
          id: 2,
          title: 'Add luggage',
          price: 130
        },
        {
          id: 3,
          title: 'Switch to comfort class',
          price: 100
        },
        {
          id: 4,
          title: 'Choose seats',
          price: 40
        },
      ]
    },
    {
      type: 'train',
      offers: [
        {
          id: 1,
          title: 'Change the compartment',
          price: 120
        },
        {
          id: 2,
          title: 'Order lunch',
          price: 30
        },
        {
          id: 3,
          title: 'Pull the stopcock',
          price: 1000
        },
        {
          id: 4,
          title: 'Choose a shelf',
          price: 150
        }
      ]
    },
    {
      type: 'ship',
      offers: [
        {
          id: 1,
          title: 'Choose a boat',
          price: 120
        },
        {
          id: 2,
          title: 'Beep',
          price: 30
        },
        {
          id: 3,
          title: 'Turn the wheel',
          price: 100
        },
        {
          id: 4,
          title: 'Dance with the captain',
          price: 15
        },
      ]
    },
    {
      type: 'drive',
      offers: [
        {
          id: 1,
          title: 'Choose a car',
          price: 120
        },
        {
          id: 2,
          title: 'Choose a color',
          price: 30
        },
        {
          id: 3,
          title: 'Choose a travel companion',
          price: 100
        }
      ]
    },
    {
      type: 'flight',
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 250
        },
        {
          id: 2,
          title: 'Add luggage',
          price: 30
        },
        {
          id: 3,
          title: 'Jump with a parachute',
          price: 800
        },
        {
          id: 4,
          title: 'Choose seats',
          price: 50
        },
      ]
    },
    {
      type: 'check-in',
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 120
        },
        {
          id: 2,
          title: 'Add luggage',
          price: 30
        },
        {
          id: 3,
          title: 'Switch to comfort class',
          price: 100
        },
        {
          id: 4,
          title: 'Choose seats',
          price: 5
        }
      ]
    },
    {
      type: 'sightseeing',
      offers: [
        {
          id: 1,
          title: 'Order a map of attractions',
          price: 20
        },
        {
          id: 2,
          title: 'Order an audio guide',
          price: 35
        },
        {
          id: 3,
          title: 'Book a tour',
          price: 75
        },
        {
          id: 4,
          title: 'Travel by train',
          price: 140
        }
      ]
    },
    {
      type: 'restaurant',
      offers: [
        {
          id: 1,
          title: 'Order a dish from the chef',
          price: 520
        },
        {
          id: 2,
          title: 'Order a business lunch',
          price: 100
        },
        {
          id: 3,
          title: 'Add meal',
          price: 15
        },
        {
          id: 4,
          title: 'Choose seats',
          price: 55
        }
      ]
    }
  ],
  type: 'flight'
};

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
      <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${id}">${firstLetterUp(offer.type)}</label>
    </div>`);
  }).join('');


const createNewPointFormTemplate = (point) => {

  const { basePrice, dateFrom, dateTo, destination, type, offers, offersByTypes, destinations, id } = point;

  const pointDateTo = fullDateTo(dateTo);
  const pointDateFrom = fullDateFrom(dateFrom);
  const pointTypeOffers = offersByTypes.find((offer) => offer.type === point.type);
  const additionOptionsTemplate = createAdditionOptionsTemplate(offers, pointTypeOffers);
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
            <button class="event__reset-btn" type="reset">Cancel</button>
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

export default class NewPointFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point = BLANK_POINT, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(NewPointFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointFormTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#eventDestinationHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('change', this.#eventPriceHandler);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #eventOfferSelectorHandler = () => {
    const inputs = this.element.querySelector('.event__available-offers').querySelectorAll('input');
    const newOffers = [];
    const newInputs = Array.prototype.slice.call(inputs);


    for ( const input of newInputs) {
      if (input.checked) {
        newOffers.push(newInputs.indexOf(input) + 1);
      }
    }
    this._state.offers = newOffers;
    this._setState(this._state.offers);
  };


  #eventTypeHandler = (evt) => {
    const newType = evt.target.value;
    const newOfferByTypes = this._state.offersByTypes.find((offer) => offer.type === newType);

    this.updateElement({
      type : newType,
      offerByTypes : newOfferByTypes,
      offers:[]
    });
  };

  #eventDestinationHandler = (evt) => {
    const newName = evt.target.value;
    const newDestination = this._state.destinations.find((direction) => direction.name === newName);
    if (newDestination) {
      this.updateElement({
        destination : newDestination,
      });
    }
  };

  #eventPriceHandler = (evt) => {
    const newPrice = evt.target.value;
    if (newPrice) {
      this._state.basePrice = newPrice;
      this._setState(this._state.basePrice);
      // this.updateElement({
      //   basePrice: newPrice,
      // });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#eventOfferSelectorHandler();
    this.#handleFormSubmit(NewPointFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(NewPointFormView.parseStateToPoint(this._state));
  };

  #dateStartChangeHandler = ([userDate]) => {
    this._state.dateFrom = userDate;
    this._setState(this._state.dateFrom);
  };

  #dateEndChangeHandler = ([userDate]) => {
    this._state.dateTo = userDate;
    this._setState(this._state.dateTo);
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateStartChangeHandler,
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateEndChangeHandler,
      }
    );
  }

  static parsePointToState(point) {
    return {...point,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state
    };
    return point;
  }
}


