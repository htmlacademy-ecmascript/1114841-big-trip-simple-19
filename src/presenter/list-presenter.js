import { render } from '../render.js';
import { RenderPosition } from '../render.js';
import { offersByTypes } from '../mock/additional-options.js';
import { destinations } from '../mock/destinations.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointView from '../view/point-view.js';
// import NewPointFormView from '../view/new-point-form-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoint = null;
  #component = new ListView();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoint = [...this.#pointModel.getPoint()];

    render(this.#component, this.#container);
    render (new TripSortView(), this.#component.element, RenderPosition.BEFOREBEGIN);
    // render (new EditPointFormView({point: this.listPoint[0], offersByTypes, destinations}), this.component.element, RenderPosition.AFTERBEGIN);
    // render (new NewPointFormView({point: this.listPoint[0], offersByTypes, destinations}), this.#component.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#listPoint.length; i++) {
      // render (new PointView({point: this.listPoint[i], offersByTypes, destinations}), this.#component.element, RenderPosition.BEFOREEND);
      this.#renderPoint(this.#listPoint[i]);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point, offersByTypes, destinations});
    const pointEditComponet = new EditPointFormView({point, offersByTypes, destinations});

    const replacePointToForm = () => {
      this.#component.element.replaceChild(pointEditComponet.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#component.element.replaceChild(pointComponent.element, pointEditComponet.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    } );

    pointEditComponet.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#component.element, RenderPosition.BEFOREEND);
  }
}
