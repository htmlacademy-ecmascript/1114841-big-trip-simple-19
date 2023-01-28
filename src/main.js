import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const newPointButtonElement = document.querySelector('.trip-main__event-add-btn');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({filterContainer: siteControlsElement, filterModel, pointsModel});
const listPresenter = new ListPresenter({listContainer: siteTripElement, filterModel, pointsModel, onNewPointDestroy: handleNewPointFormClose});


newPointButtonElement.addEventListener('click',clickHandler);

function clickHandler() {
  handleNewTaskButtonClick();
}

function handleNewPointFormClose() {
  // newPointButtonElement.element.disabled = false;
  newPointButtonElement.disabled = false;
}

function handleNewTaskButtonClick() {
  listPresenter.createPoint();
  // newPointButtonElement.element.disabled = true;
  newPointButtonElement.disabled = true;
}

filterPresenter.init();
listPresenter.init();
