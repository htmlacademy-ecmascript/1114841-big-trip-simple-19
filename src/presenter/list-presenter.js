import { render } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/trip-sort-view.js';
// import NewPointFormView from '../view/new-point-form-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoints = null;
  #component = new ListView();
  #pointPresenters = new Map();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoints = [...this.#pointModel.point];
    this.#renderList();
  }

  #handlePointChange = (updatePoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#component.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderList() {
    render(this.#component, this.#container);

    if (this.#listPoints.every((point) => point === null)) {
      render(new NoPointView(), this.#component.element, RenderPosition.BEFOREBEGIN);
      return;
    }
    // render (new EditPointFormView({point: this.listPoints[0]}), this.component.element, RenderPosition.AFTERBEGIN);
    // render (new NewPointFormView({point: this.#listPoints[0]}), this.#component.element, RenderPosition.BEFOREEND);
    render (new TripSortView(), this.#component.element, RenderPosition.BEFOREBEGIN);
    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }
}
