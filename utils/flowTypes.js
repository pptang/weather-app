// @flow

export type Location = {
  city: string,
  country: string,
};

export type WeatherDataItem = {
  condition: {
    code: string,
    date: string,
    temp: string,
    text: string,
  },
  forecast: Array<{
    code: string,
    date: string,
    day: string,
    high: string,
    low: string,
    text: string,
  }>,
};
