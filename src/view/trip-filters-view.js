import AbstractView from '../framework/view/abstract-view.js';

const createTripFiltersTemplate = (points) => {

  const dateNow = Date.now();

  const disabledPoints = points.map((point) =>{
    const currentDate = new Date(point.dateTo);
    const disableDate = dateNow > currentDate.getTime() ? 'disabled' : 'included';
    return disableDate;
  });
  const disabled = disabledPoints.find((disabledPoint) => disabledPoint === 'included') ? ' ' : 'disabled' ;

  return (
    `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${disabled}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);

};

export default class TripFiltersView extends AbstractView {
  #points = null;

  constructor({points}) {

    super();
    this.#points = points;
  }

  get template() {
    return createTripFiltersTemplate(this.#points);
  }
}
