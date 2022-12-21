import {createElement} from '../render.js';

const createListViewTemplate = () =>
  `<ul class="trip-events__list">
    </ul>`;


export default class ListView {
  #element = null;

  get template() {
    return createListViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
