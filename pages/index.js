// @flow

import React from 'react';
import fetch from 'isomorphic-unfetch';

import getWeatherData from '../utils/weatherApi';
import getWeatherIcon from '../utils/weatherIconMap';

type Props = {
  weatherData: {
    title: string,
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
  },
};

type State = {
  location: string,
};

class Index extends React.Component<Props, State> {
  static async getInitialProps() {
    const weatherDataResponse = await fetch(getWeatherData());
    const weatherDataJsonResponse = await weatherDataResponse.json();

    return {
      weatherData: weatherDataJsonResponse.query.count
        ? weatherDataJsonResponse.query.results.channel.item
        : undefined,
    };
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      location: '',
    };
  }
  render() {
    return (
      <div className="container">
        <header className="header">Put searchbox here: {this.state.location}</header>
        {this.props.weatherData ? (
          <div className="mainWrapper">
            <section className="currentConditionContainer">
              <h1 className="mainTitle">{this.props.weatherData.title}</h1>
              <article className="weatherCondition">
                <h2 className="degree">
                  <span>{this.props.weatherData.condition.temp}&#176;</span>
                  <img
                    alt="weather"
                    src={getWeatherIcon(this.props.weatherData.condition.code)}
                    className="weatherIcon"
                  />
                </h2>
                <div>{this.props.weatherData.condition.text}</div>
              </article>
            </section>
            <section className="forecastContainer">
              <span>Forcast: {this.props.weatherData.forecast.length}</span>
            </section>
          </div>
        ) : (
          <div>Something Wrong!</div>
        )}
        <style jsx>
          {`
            .container {
              background-color: #39b5fc;
            }
            .header {
              height: 50px;
            }
            .mainWrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100vh;
            }
            .currentConditionContainer {
              flex: 1;
              color: #ffffff;
              padding: 30px;
            }
            .weatherCondition {
              margin-left: 30px;
            }
            .mainTitle {
              text-align: center;
              font-size: 24px;
            }
            .degree {
              font-size: 48px;
              margin: 0;
            }
            .weatherIcon {
              vertical-align: middle;
            }
            .forecastContainer {
              height: 150px;
              background-color: #fefeff;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
