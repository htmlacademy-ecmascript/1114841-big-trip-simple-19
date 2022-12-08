import { render } from '../render';
import { RenderPosition } from '../render';
import ListView from '../view/list-view';
import TripSortView from '../view/trip-sort';
import EventView from '../view/event';
import NewPointFormView from '../view/new-point-form';
import EditPointFormView from '../view/edit-point-form';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent, this.listContainer);
    render (new TripSortView(), this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);
    render (new EditPointFormView(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render (new NewPointFormView(), this.listComponent.getElement(), RenderPosition.BEFOREEND);


    for (let i = 0; i < 3; i++) {
      render (new EventView(), this.listComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
