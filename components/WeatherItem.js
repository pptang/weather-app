// @flow
import * as React from 'react';
import moment from 'moment';
import getWeatherIconClass from '../utils/weatherIconClassMap';

type Props = {
  code: string,
  day: string,
  date: string,
  high: string,
  low: string,
  isSelected: boolean,
};

const WeatherItem = (props: Props) => (
  <article className={`weatherItemWrapper ${props.isSelected ? 'isSelected' : ''}`}>
    <h2>{props.day}</h2>
    <p className="date">{moment(props.date).format('MMM DD')}</p>
    <figure>
      <i className={`wi ${getWeatherIconClass(props.code)}`} />
    </figure>
    <div>
      <span>{props.low}&#176;</span>~<span>{props.high}&#176;</span>
    </div>
    <style jsx>
      {`
        .weatherItemWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          background-color: #ffffff;
          color: #2e3849;
          cursor: pointer;
          transition: all 0.5s;
        }
        .weatherItemWrapper:hover {
          color: #4581cf;
        }
        .isSelected {
          color: #4581cf;
          font-size: 17px;
          box-shadow: inset 0px 0px 14px 0px rgba(133, 184, 255, 0.75);
        }
        .date {
          text-align: center;
          font-weight: 400;
          font-size: 12px;
          font-style: italic;
          margin: 0;
        }
      `}
    </style>
  </article>
);

export default WeatherItem;
