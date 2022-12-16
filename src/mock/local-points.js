import { getRandomArrayElement } from '../util.js';

const localPoints = [
  {
    basePrice: 222,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 1,
      description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      name: 'Chamonix',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        },
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 2,
      title: 'Add luggage',
      price: 30
    },
    {
      id: 3,
      title: 'Switch to comfort class',
      price: 100
    },
    {
      id: 4,
      title: 'Add meal',
      price: 15
    }],
    type: 'taxi'
  },
  {
    basePrice: 315,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 1,
      description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      name: 'Chamonix',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        }
      ]
    },
    offers: [{
      id: 4,
      title: 'Add meal',
      price: 15
    },
    {
      id: 5,
      title: 'Choose seats',
      price: 5
    },
    {
      id: 6,
      title: 'Travel by train',
      price: 40
    }],
    type: 'bus'
  },
  {
    basePrice: 400,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 1,
      description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      name: 'Chamonix',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=4',
          description: 'Chamonix parliament building'
        }
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 6,
      title: 'Travel by train',
      price: 40
    }],
    type: 'train'
  },
  {
    basePrice: 650,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        },
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 2,
      title: 'Add luggage',
      price: 30
    },
    {
      id: 3,
      title: 'Switch to comfort class',
      price: 100
    },
    {
      id: 4,
      title: 'Add meal',
      price: 15
    },
    {
      id: 5,
      title: 'Choose seats',
      price: 5
    },
    {
      id: 6,
      title: 'Travel by train',
      price: 40
    }],
    type: 'ship'
  },
  {
    basePrice: 150,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        }
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    }],
    type: 'drive'
  },
  {
    basePrice: 820,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Aliquam id orci ut lectus varius viverra.'
        }
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 6,
      title: 'Travel by train',
      price: 40
    }],
    type: 'flight'
  },
  {
    basePrice: 345,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 3,
      description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
      name: 'Geneva',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=4',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=5',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=6',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=7',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=8',
          description: 'Chamonix parliament building'
        }
      ]
    },
    offers: [{
      id: 2,
      title: 'Add luggage',
      price: 30
    },
    {
      id: 3,
      title: 'Switch to comfort class',
      price: 100
    },
    {
      id: 4,
      title: 'Add meal',
      price: 15
    },
    {
      id: 6,
      title: 'Travel by train',
      price: 40
    }],
    type: 'check-in'
  },
  {
    basePrice: 125,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 3,
      description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
      name: 'Geneva',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=1',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=2',
          description: 'Chamonix parliament building'
        },
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Chamonix parliament building'
        }
      ]
    },
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 2,
      title: 'Add luggage',
      price: 30
    },
    {
      id: 5,
      title: 'Choose seats',
      price: 5
    }
    ],
    type: 'sightseeing'
  },
  {
    basePrice: 235,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      id: 3,
      description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
      name: 'Geneva',
      pictures: [
        {
          src: 'https://loremflickr.com/248/152?random=3',
          description: 'Fusce tristique felis at fermentum pharetra.'
        }
      ]
    },
    offers: [{
      id: 4,
      title: 'Add meal',
      price: 15
    }],
    type: 'restaurant'
  },
];

const getRandomPoint = () => getRandomArrayElement(localPoints);

export {getRandomPoint};
