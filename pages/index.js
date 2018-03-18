// @flow

import React from 'react';
import fetch from 'isomorphic-unfetch';

import getWeatherData from '../utils/weatherApi';
import getWeatherIconClass from '../utils/weatherIconClassMap';
import WeatherItem from '../components/WeatherItem';
import Searchbox from '../components/Searchbox';
import Selectbox from '../components/Selectbox';
import type { Location, WeatherDataItem } from '../utils/flowTypes';

type Props = {
  weatherData: {
    location: Location,
    item: WeatherDataItem,
  },
};

type State = {
  selectedWeatherItemIndex: number,
  weatherDataItem: WeatherDataItem,
  weatherDataLocation: Location,
};

class Index extends React.Component<Props, State> {
  static async getInitialProps() {
    const weatherDataResponse = await fetch(getWeatherData());
    const weatherDataJsonResponse = await weatherDataResponse.json();

    return {
      weatherData: weatherDataJsonResponse.query.count
        ? weatherDataJsonResponse.query.results.channel
        : undefined,
    };
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      weatherDataItem: props.weatherData.item,
      weatherDataLocation: props.weatherData.location,
      selectedWeatherItemIndex: 0,
    };
  }

  onSearch = async (location: string) => {
    const weatherDataResponse = await fetch(getWeatherData(location));
    const weatherDataJsonResponse = await weatherDataResponse.json();
    this.setState({
      weatherDataItem: weatherDataJsonResponse.query.count
        ? weatherDataJsonResponse.query.results.channel.item
        : undefined,
      weatherDataLocation: weatherDataJsonResponse.query.count
        ? weatherDataJsonResponse.query.results.channel.location
        : undefined,
    });
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <Searchbox onSearch={this.onSearch} />
          <Selectbox onSelect={this.onSearch} />
        </header>
        {this.state.weatherDataItem ? (
          <div className="mainWrapper">
            <section className="currentConditionContainer">
              <h1 className="mainTitle">{this.state.weatherDataLocation.city}</h1>
              <h3 className="subtitle">{this.state.weatherDataLocation.country}</h3>
              <article className="weatherCondition">
                <h2 className="degree">
                  <span>{this.state.weatherDataItem.condition.temp}&#176;</span>
                  <i
                    className={`wi ${getWeatherIconClass(this.state.weatherDataItem.condition.code)} weatherIcon`}
                  />
                </h2>
                <div>{this.state.weatherDataItem.condition.text}</div>
              </article>
            </section>
            <section className="forecastContainer">
              {this.state.weatherDataItem.forecast.map((weatherItem, index) => (
                <div
                  role="button"
                  tabIndex="0"
                  className="weatherItem"
                  onClick={() => this.setState({ selectedWeatherItemIndex: index })}
                  onKeyPress={evt => {
                    if (evt && evt.key === 'Enter') {
                      this.setState({ selectedWeatherItemIndex: index });
                    }
                  }}
                >
                  <WeatherItem
                    key={weatherItem.date}
                    code={weatherItem.code}
                    day={weatherItem.day}
                    high={weatherItem.high}
                    low={weatherItem.low}
                    isSelected={index === this.state.selectedWeatherItemIndex}
                  />
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div>Something Wrong!</div>
        )}
        <style jsx>
          {`
            .container {
              background-color: #39b5fc;
              width: 100%;
              height: 100vh;
              display: flex;
              flex-direction: column;
            }
            .header {
              height: 50px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .mainWrapper {
              display: flex;
              flex-direction: column;
              flex: 1;
            }
            .currentConditionContainer {
              flex: 1;
              color: #ffffff;
              padding: 30px;
              display: flex;
              flex-direction: column;
            }
            .weatherCondition {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: auto;
            }
            .mainTitle {
              text-align: center;
              font-size: 60px;
              margin-bottom: 0;
            }
            .subtitle {
              text-align: center;
              font-weight: 400;
            }
            .degree {
              font-size: 60px;
              margin: 0;
            }
            .weatherIcon {
              vertical-align: middle;
              color: #ffffff;
            }
            .forecastContainer {
              display: flex;
              height: 200px;
              background-color: #fefeff;
              overflow-x: scroll;
            }
            .weatherItem {
              flex: 1;
              outline: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
