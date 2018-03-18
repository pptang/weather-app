// @flow

import React from 'react';
import fetch from 'isomorphic-unfetch';

import { getCurrentCondition, getTenDaysForecasts } from '../utils/weatherApi';

type Props = {
  currentCondition: ?{
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

function Index(props: Props) {
  return (
    <div>
      <span>Current Condition: {props.currentCondition && props.currentCondition.temp}</span>
      <span>Forcast: {props.forecast.length}</span>
    </div>
  );
}

Index.getInitialProps = async () => {
  const currentConditionResponse = await fetch(getCurrentCondition());
  const forecastResponse = await fetch(getTenDaysForecasts());
  const currentConditionJsonResponse = await currentConditionResponse.json();
  const forecastJsonResponse = await forecastResponse.json();

  return {
    currentCondition: currentConditionJsonResponse.query.count
      ? currentConditionJsonResponse.query.results.channel.item.condition
      : undefined,
    forecast: forecastJsonResponse.query.count
      ? forecastJsonResponse.query.results.channel.item.forecast
      : [],
  };
};

export default Index;
