import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

// const BLANK_POINT = {
//   basePrice: 200,
//   dateFrom: 'Sat Feb 04 2023 12:28:05 GMT+0300 (Москва, стандартное время) {}',
//   dateTo: 'Sat Feb 04 2023 16:34:43 GMT+0300 (Москва, стандартное время) {}',
//   destination: 1,
//   offers: [1, 2, 3, 5],
//   type: 'taxi'
// };

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offersByTypes = [];
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points.map((point) => {
      const offerByTypes = this.#getOfferByTypes(point).offerByTypes;
      const destination = this.#getDestination(point).destination;
      const offersByTypes = this.#offersByTypes;
      const destinations = this.#destinations;

      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }

  get blankPoint() {
    const BLANK_POINT = {
      basePrice: 200,
      dateFrom: '2023-04-02T12:55:56.845Z',
      dateTo: '2023-04-02T14:22:13.375Z',
      destination: 1,
      destinations: [
        {
          'id': 1,
          'name': 'Chamonix',
          'description': 'Chamonix, a true asian pearl, with crowded streets, with a beautiful old town.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Chamonix biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Chamonix biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Chamonix parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Chamonix city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Chamonix embankment'
            }
          ]
        },
        {
          'id': 2,
          'name': 'Geneva',
          'description': 'Geneva, with a beautiful old town, middle-eastern paradise.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Geneva kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Geneva street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Geneva zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Geneva street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Geneva zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Geneva zoo'
            }
          ]
        },
        {
          'id': 3,
          'name': 'Amsterdam',
          'description': 'Amsterdam, with a beautiful old town, middle-eastern paradise.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Amsterdam central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Amsterdam zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Amsterdam city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Amsterdam park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Amsterdam parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Amsterdam zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Amsterdam kindergarten'
            }
          ]
        },
        {
          'id': 4,
          'name': 'Helsinki',
          'description': 'Helsinki, a true asian pearl, in a middle of Europe, with a beautiful old town.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Helsinki kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Helsinki city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Helsinki parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Helsinki parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Helsinki zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Helsinki parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Helsinki central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Helsinki embankment'
            }
          ]
        },
        {
          'id': 5,
          'name': 'Oslo',
          'description': 'Oslo, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Oslo city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Oslo kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Oslo city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Oslo park'
            }
          ]
        },
        {
          'id': 6,
          'name': 'Kopenhagen',
          'description': 'Kopenhagen, with crowded streets, in a middle of Europe, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Kopenhagen parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Kopenhagen embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Kopenhagen biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Kopenhagen zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Kopenhagen zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Kopenhagen kindergarten'
            }
          ]
        },
        {
          'id': 7,
          'name': 'Den Haag',
          'description': 'Den Haag, a true asian pearl, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Den Haag city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Den Haag city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Den Haag central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Den Haag kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Den Haag park'
            }
          ]
        },
        {
          'id': 8,
          'name': 'Rotterdam',
          'description': 'Rotterdam, with a beautiful old town.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Rotterdam embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Rotterdam kindergarten'
            }
          ]
        },
        {
          'id': 9,
          'name': 'Saint Petersburg',
          'description': 'Saint Petersburg, is a beautiful city, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Saint Petersburg kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Saint Petersburg kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Saint Petersburg park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Saint Petersburg parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Saint Petersburg kindergarten'
            }
          ]
        },
        {
          'id': 10,
          'name': 'Moscow',
          'description': 'Moscow, with crowded streets, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Moscow park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Moscow kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Moscow embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Moscow biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Moscow biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Moscow kindergarten'
            }
          ]
        },
        {
          'id': 11,
          'name': 'Sochi',
          'description': 'Sochi, middle-eastern paradise, a perfect place to stay with a family.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/13.jpg',
              'description': 'Sochi parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Sochi parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Sochi park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Sochi city centre'
            }
          ]
        },
        {
          'id': 12,
          'name': 'Tokio',
          'description': 'Tokio, with crowded streets, for those who value comfort and coziness.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Tokio city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Tokio kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Tokio park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Tokio central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Tokio central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Tokio central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Tokio biggest supermarket'
            }
          ]
        },
        {
          'id': 13,
          'name': 'Kioto',
          'description': 'Kioto, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Kioto biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Kioto kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/13.jpg',
              'description': 'Kioto park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Kioto embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Kioto embankment'
            }
          ]
        },
        {
          'id': 14,
          'name': 'Nagasaki',
          'description': 'Nagasaki, a true asian pearl, middle-eastern paradise.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Nagasaki city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Nagasaki embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Nagasaki park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Nagasaki street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Nagasaki biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Nagasaki zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/13.jpg',
              'description': 'Nagasaki street market'
            }
          ]
        },
        {
          'id': 15,
          'name': 'Hiroshima',
          'description': 'Hiroshima, a true asian pearl, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Hiroshima parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Hiroshima central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Hiroshima city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Hiroshima biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Hiroshima city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Hiroshima kindergarten'
            }
          ]
        },
        {
          'id': 16,
          'name': 'Berlin',
          'description': 'Berlin, is a beautiful city, a true asian pearl, with crowded streets, with an embankment of a mighty river as a centre of attraction.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Berlin city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Berlin embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Berlin kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Berlin biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Berlin street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Berlin street market'
            }
          ]
        },
        {
          'id': 17,
          'name': 'Munich',
          'description': 'Munich, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Munich street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/13.jpg',
              'description': 'Munich street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Munich zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Munich park'
            }
          ]
        },
        {
          'id': 18,
          'name': 'Frankfurt',
          'description': 'Frankfurt, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Frankfurt zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Frankfurt embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Frankfurt zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Frankfurt kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Frankfurt zoo'
            }
          ]
        },
        {
          'id': 19,
          'name': 'Vien',
          'description': 'Vien, in a middle of Europe.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Vien biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Vien city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Vien zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Vien zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Vien biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Vien kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Vien central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/15.jpg',
              'description': 'Vien kindergarten'
            }
          ]
        },
        {
          'id': 20,
          'name': 'Rome',
          'description': 'Rome, in a middle of Europe, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Rome street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Rome parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Rome kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Rome city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Rome central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Rome parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Rome central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Rome central station'
            }
          ]
        },
        {
          'id': 21,
          'name': 'Naples',
          'description': 'Naples, with crowded streets, with a beautiful old town.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Naples central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Naples kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Naples embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Naples embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Naples park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Naples kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Naples embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Naples kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/2.jpg',
              'description': 'Naples biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Naples central station'
            }
          ]
        },
        {
          'id': 22,
          'name': 'Venice',
          'description': 'Venice, with crowded streets, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Venice embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Venice kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Venice street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Venice kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Venice parliament building'
            }
          ]
        },
        {
          'id': 23,
          'name': 'Milan',
          'description': 'Milan, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Milan embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Milan street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Milan biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Milan central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Milan central station'
            }
          ]
        },
        {
          'id': 24,
          'name': 'Monaco',
          'description': 'Monaco, a true asian pearl, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Monaco embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Monaco parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Monaco parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Monaco city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Monaco parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Monaco zoo'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/12.jpg',
              'description': 'Monaco central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Monaco central station'
            }
          ]
        },
        {
          'id': 25,
          'name': 'Paris',
          'description': 'Paris, is a beautiful city, for those who value comfort and coziness.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Paris kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/7.jpg',
              'description': 'Paris biggest supermarket'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/11.jpg',
              'description': 'Paris embankment'
            }
          ]
        },
        {
          'id': 26,
          'name': 'Barcelona',
          'description': 'Barcelona, is a beautiful city, in a middle of Europe, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/17.jpg',
              'description': 'Barcelona street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Barcelona city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Barcelona street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Barcelona embankment'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/19.jpg',
              'description': 'Barcelona street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/4.jpg',
              'description': 'Barcelona kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Barcelona parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Barcelona street market'
            }
          ]
        },
        {
          'id': 27,
          'name': 'Valencia',
          'description': 'Valencia, with crowded streets, middle-eastern paradise, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Valencia park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/9.jpg',
              'description': 'Valencia park'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/1.jpg',
              'description': 'Valencia kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/8.jpg',
              'description': 'Valencia city centre'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/5.jpg',
              'description': 'Valencia biggest supermarket'
            }
          ]
        },
        {
          'id': 28,
          'name': 'Madrid',
          'description': 'Madrid, in a middle of Europe, with a beautiful old town, middle-eastern paradise.',
          'pictures': [
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/18.jpg',
              'description': 'Madrid central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/10.jpg',
              'description': 'Madrid street market'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/14.jpg',
              'description': 'Madrid kindergarten'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/6.jpg',
              'description': 'Madrid central station'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/3.jpg',
              'description': 'Madrid parliament building'
            },
            {
              'src': 'https://18.ecmascript.pages.academy/static/destinations/16.jpg',
              'description': 'Madrid street market'
            }
          ]
        }
      ],
      offersByTypes:[
        {
          'type': 'taxi',
          'offers': [
            {
              'id': 1,
              'title': 'Upgrade to a business class',
              'price': 190
            },
            {
              'id': 2,
              'title': 'Choose the radio station',
              'price': 30
            },
            {
              'id': 3,
              'title': 'Choose temperature',
              'price': 170
            },
            {
              'id': 4,
              'title': 'Drive quickly, I\'m in a hurry',
              'price': 100
            },
            {
              'id': 5,
              'title': 'Drive slowly',
              'price': 110
            }
          ]
        },
        {
          'type': 'bus',
          'offers': [
            {
              'id': 1,
              'title': 'Infotainment system',
              'price': 50
            },
            {
              'id': 2,
              'title': 'Order meal',
              'price': 100
            },
            {
              'id': 3,
              'title': 'Choose seats',
              'price': 190
            }
          ]
        },
        {
          'type': 'train',
          'offers': [
            {
              'id': 1,
              'title': 'Book a taxi at the arrival point',
              'price': 110
            },
            {
              'id': 2,
              'title': 'Order a breakfast',
              'price': 80
            },
            {
              'id': 3,
              'title': 'Wake up at a certain time',
              'price': 140
            }
          ]
        },
        {
          'type': 'flight',
          'offers': [
            {
              'id': 1,
              'title': 'Choose meal',
              'price': 120
            },
            {
              'id': 2,
              'title': 'Choose seats',
              'price': 90
            },
            {
              'id': 3,
              'title': 'Upgrade to comfort class',
              'price': 120
            },
            {
              'id': 4,
              'title': 'Upgrade to business class',
              'price': 120
            },
            {
              'id': 5,
              'title': 'Add luggage',
              'price': 170
            },
            {
              'id': 6,
              'title': 'Business lounge',
              'price': 160
            }
          ]
        },
        {
          'type': 'check-in',
          'offers': [
            {
              'id': 1,
              'title': 'Choose the time of check-in',
              'price': 70
            },
            {
              'id': 2,
              'title': 'Choose the time of check-out',
              'price': 190
            },
            {
              'id': 3,
              'title': 'Add breakfast',
              'price': 110
            },
            {
              'id': 4,
              'title': 'Laundry',
              'price': 140
            },
            {
              'id': 5,
              'title': 'Order a meal from the restaurant',
              'price': 30
            }
          ]
        },
        {
          'type': 'sightseeing',
          'offers': []
        },
        {
          'type': 'ship',
          'offers': [
            {
              'id': 1,
              'title': 'Choose meal',
              'price': 130
            },
            {
              'id': 2,
              'title': 'Choose seats',
              'price': 160
            },
            {
              'id': 3,
              'title': 'Upgrade to comfort class',
              'price': 170
            },
            {
              'id': 4,
              'title': 'Upgrade to business class',
              'price': 150
            },
            {
              'id': 5,
              'title': 'Add luggage',
              'price': 100
            },
            {
              'id': 6,
              'title': 'Business lounge',
              'price': 40
            }
          ]
        },
        {
          'type': 'drive',
          'offers': [
            {
              'id': 1,
              'title': 'With automatic transmission',
              'price': 110
            },
            {
              'id': 2,
              'title': 'With air conditioning',
              'price': 180
            }
          ]
        },
        {
          'type': 'restaurant',
          'offers': [
            {
              'id': 1,
              'title': 'Choose live music',
              'price': 150
            },
            {
              'id': 2,
              'title': 'Choose VIP area',
              'price': 70
            }
          ]
        }
      ],
      offers: [1, 2, 3, 5],
      type: 'taxi'
    };

    // const offerByTypes = this.#getOfferByTypes(BLANK_POINT).offerByTypes;
    // const destination = this.#getDestination(BLANK_POINT).destination;
    // const offerByTypes = this.#offersByTypes.find((offer) => offer.type === point.type);
    // const destination = this.#destinations.find((direction) => direction.id === point.destination);
    const offerByTypes = BLANK_POINT.offersByTypes.find((offer) => offer.type === BLANK_POINT.type);
    const destination = BLANK_POINT.destinations.find((direction) => direction.id === BLANK_POINT.destination);
    // const offersByTypes = this.#offersByTypes;
    // const destinations = this.#destinations;
    // console.log('offerByTypes', offerByTypes)
    // console.log('destination', destination)

    return {
      ...BLANK_POINT,
      destination,
      offerByTypes,
      // offersByTypes,
      // destinations
    };
  }

  #getOfferByTypes = (point) => {
    // console.log('point', point)
    const offerByTypes = this.#offersByTypes.find((offer) => offer.type === point.type);
    return {offerByTypes};
  };

  #getDestination = (point) => {
    const destination = this.#destinations.find((direction) => direction.id === point.destination);
    return { destination};
  };

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const allOffers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#offersByTypes = allOffers;
      this.#destinations = destinations;
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }


  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0,index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint,...this.#points,];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }
}
