import { render } from '../render.js';
import { RenderPosition } from '../render.js';
import ListView from '../view/list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointView from '../view/point-view.js';
import NewPointFormView from '../view/new-point-form-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';

export default class ListPresenter {
  component = new ListView();

  constructor({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.listPoint = [...this.pointModel.getPoint()];

    render(this.component, this.container);
    render (new TripSortView(), this.component.getElement(), RenderPosition.BEFOREBEGIN);
    // render (new EditPointFormView(), this.component.getElement(), RenderPosition.AFTERBEGIN);
    render (new NewPointFormView({point: this.listPoint[0]}), this.component.getElement(), RenderPosition.BEFOREEND);

    for (let i = 1; i < this.listPoint.length; i++) {
      render (new PointView({point: this.listPoint[i]}), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
