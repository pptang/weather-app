// @flow
import * as React from 'react';

import getWeatherIconClass from '../utils/weatherIconClassMap';

type Props = {
  code: string,
  day: string,
  high: string,
  low: string,
  isSelected: boolean,
};

const WeatherItem = (props: Props) => (
  <article className={`weatherItemWrapper ${props.isSelected ? 'isSelected' : ''}`}>
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
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          background-color: #ffffff;
          color: #2e3849;
          cursor: pointer;
        }
        .weatherItemWrapper:hover {
          color: #4581cf;
        }
        .isSelected {
          color: #4581cf;
          font-size: 17px;
        }
      `}
    </style>
  </article>
);

export default WeatherItem;
