import { render } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/trip-sort-view.js';
// import NewPointFormView from '../view/new-point-form-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../util/util.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointPrice } from '../util/util.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoints = null;
  #component = new ListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  // #sortComponent = new TripSortView;
  #sortComponent = null;
  #noTaskComponent = new NoPointView();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoints = [...this.#pointModel.point];
    this.#listPoints.sort(sortPointDay);
    this.#renderList();
    this.#renderSort();
  }

  #handlePointChange = (updatePoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.DAY:
        this.#listPoints.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPointPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
    this.#clearPointList();
    this.#renderList();
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

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (this.#listPoints.every((point) => point === null)) {
      return;
    }
    render (this.#sortComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderNoTaskComponent() {
    if (this.#listPoints.every((point) => point === null)) {
      render(this.#noTaskComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
    }
  }

  #renderList() {
    render(this.#component, this.#container);
    this.#renderNoTaskComponent();
    // render (new EditPointFormView({point: this.listPoints[0]}), this.component.element, RenderPosition.AFTERBEGIN);
    // render (new NewPointFormView({point: this.#listPoints[0]}), this.#component.element, RenderPosition.BEFOREEND);
    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }
}
