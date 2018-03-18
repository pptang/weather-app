// @flow
import * as React from 'react';

import getWeatherIconClass from '../utils/weatherIconClassMap';

type Props = {
  code: string,
  day: string,
  high: string,
  low: string,
};

const WeatherItem = (props: Props) => (
  <article className="weatherItemWrapper">
    <h2>{props.day}</h2>
    <figure>
      <i className={`wi ${getWeatherIconClass(props.code)}`} />
    </figure>
    <div>
      <span>{props.low}&#176;</span>~<span>{props.high}&#176;</span>
    </div>
    <style jsx>
      {`
        .weatherItemWrapper {
          height: 100%;
          background-color: #ffffff;
          color: #2e3849;
        }
        .weatherItemWrapper:hover {
          color: #4581cf;
        }
      `}
    </style>
  </article>
);

export default WeatherItem;
