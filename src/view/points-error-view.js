import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = () => ('<p class="trip-events__msg">Server is not responding</p>');

export default class PointsErrorView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
