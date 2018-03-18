// @flow

import WEATHER_BASE_URL from './constants';

export const getCurrentCondition = (keyword: string = 'tokyo') =>
  `${WEATHER_BASE_URL}?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='${keyword}')&format=json`;

export const getTenDaysForecasts = (keyword: string = 'tokyo') =>
  `${WEATHER_BASE_URL}?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${keyword}')&format=json`;
