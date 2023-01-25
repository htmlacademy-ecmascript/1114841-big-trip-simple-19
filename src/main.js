import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({container: siteTripElement, filterContainer: siteControlsElement, pointsModel});

listPresenter.init();
