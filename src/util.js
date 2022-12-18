// import { offersByTypes } from './mock/additional-options.js';
// import { destinations } from './mock/destinations.js';
import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
const DAY_FORMAT = 'DD MMMM';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandom = (items) => items[Math.floor(Math.random() * items.length)];


// const getOffers = (items) => {
//   const newOffers = [];

//   for (const item of items) {
//     const offer = offersByTypes.find((offerByTypes) => offerByTypes.id === item);
//     newOffers.push(offer);
//   }
//   return newOffers;
// };

// const getDestination = (items) => {
//   const newDestinations = [];

//   for (const item of items) {
//     const direction = destinations.find((destination) => destination.id === item);
//     newDestinations.push(direction);
//   }
//   return newDestinations;
// };

export {getRandomArrayElement, getRandom, fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo, dayDate};
