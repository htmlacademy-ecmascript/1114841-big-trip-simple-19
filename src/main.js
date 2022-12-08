import ListPresenter from './presenter/list-presenter';
import { render } from './render';
import { RenderPosition } from './render';
import TripFiltersView from './view/trip-filters';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const listPresenter = new ListPresenter({listContainer: siteTripElement});

render (new TripFiltersView(), siteControlsElement, RenderPosition.BEFOREEND);

listPresenter.init();
