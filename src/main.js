import ListPresenter from './presenter/list-presenter.js';
import { render } from './render.js';
import { RenderPosition } from './render.js';
import TripFiltersView from './view/trip-filters-view.js';
import PointModel from './model/point-model.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const listPresenter = new ListPresenter({container: siteTripElement, pointModel,});

render (new TripFiltersView(), siteControlsElement, RenderPosition.BEFOREEND);

listPresenter.init();
