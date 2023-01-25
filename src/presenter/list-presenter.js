import { render, remove, RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortPointDay, sortPointPrice, filterPointFuture } from '../util/util.js';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #filterContainer = null;
  #filterComponent = null;
  #component = new ListView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;

  #sortComponent = null;
  #noTaskComponent = new NoPointView();

  constructor({container, filterContainer, pointsModel}) {
    this.#container = container;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointDay);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.#renderFilter();
    this.#renderList();
    this.#renderSort();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
      // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
      // - обновить список (например, когда задача ушла в архив)
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
      // - обновить всю доску (например, при переключении фильтра)
        this.#clearList();
        this.#renderList({resetSortType: true});
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    // - Очищаем список
    // - Рендерим список заново
    this.#clearList();
    this.#renderList();
  };

  #renderFilter() {
    this.#filterComponent = new TripFiltersView({
      points: this.#pointsModel.points,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    render (this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREBEGIN);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }
    this.#currentFilterType = filterType;


    const getFilteredDates = () => {
      switch (this.#currentFilterType) {
        case FilterType.EVERYTHING:
          return [...this.#pointsModel.points];
        case FilterType.FUTURE:
          return [...this.#pointsModel.points].filter(filterPointFuture);
      }
      return this.#pointsModel.points;
    };
    getFilteredDates();
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#component.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (this.#pointsModel.points.every((point) => point === null)) {
      return;
    }
    render (this.#sortComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderNoTaskComponent() {
    render(this.#noTaskComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #clearList({resetSortType = false} = {}) {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#noTaskComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderList() {
    render(this.#component, this.#container);

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoTaskComponent();
    }
    // render (new EditPointFormView({point: this.listPoints[0]}), this.component.element, RenderPosition.AFTERBEGIN);
    // render (new NewPointFormView({point: this.#listPoints[0]}), this.#component.element, RenderPosition.BEFOREEND);
    for (let i = 0; i < pointCount; i++) {
      this.#renderPoint(points[i]);
    }
  }
}
