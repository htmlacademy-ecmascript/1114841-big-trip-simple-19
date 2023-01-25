import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DAY_FORMAT = 'DD MMM';
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

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const filterPointFuture = (point) => {
  const dateNow = Date.now();
  const currentDate = new Date(point.dateTo);
  if (dateNow <= currentDate.getTime()) {
    console.log('Будущая дата', point)
    return point;
  }
  console.log('дата не подошла')
};

export {getRandomArrayElement, getRandom, fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo, dayDate, machineDayDate, machineDateTimeFrom, machineDateTimeTo, sortPointDay, sortPointPrice, filterPointFuture};
