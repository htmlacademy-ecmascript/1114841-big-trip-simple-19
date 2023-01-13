import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
const DAY_FORMAT = 'DD MMMM';
const MACHINE_DAY_FORMAT = 'YYYY-MM-DD';
const MACHINE_TIME_FORMAT = 'YYYY-MM-DDThh:mm';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const machineDateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_TIME_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const machineDateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(MACHINE_TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';
const machineDayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_DAY_FORMAT) : '';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandom = (items) => items[Math.floor(Math.random() * items.length)];


const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointPrice = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);

  return weight ?? dayjs(pointB.basePrice).diff(dayjs(pointA.basePrice));
};

export {getRandomArrayElement, getRandom, fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo, dayDate, machineDayDate, machineDateTimeFrom, machineDateTimeTo, updateItem, sortPointDay, sortPointPrice};
