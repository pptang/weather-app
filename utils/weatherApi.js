// @flow

import WEATHER_BASE_URL from './constants';

const getWeatherData = (keyword: string = 'tokyo') =>
  `${WEATHER_BASE_URL}?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${keyword}')&format=json`;
export default getWeatherData;
