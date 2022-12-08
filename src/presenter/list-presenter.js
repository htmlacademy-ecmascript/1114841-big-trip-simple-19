import { render } from '../render';
import { RenderPosition } from '../render';
import ListView from '../view/list-view';
import TripSortView from '../view/trip-sort';
import EventView from '../view/event';
import NewPointFormView from '../view/new-point-form';
import EditPointFormView from '../view/edit-point-form';

export default class ListPresenter {
  component = new ListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.component, this.container);
    render (new TripSortView(), this.component.getElement(), RenderPosition.BEFOREBEGIN);
    render (new EditPointFormView(), this.component.getElement(), RenderPosition.AFTERBEGIN);
    render (new NewPointFormView(), this.component.getElement(), RenderPosition.BEFOREEND);


    for (let i = 0; i < 3; i++) {
      render (new EventView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
