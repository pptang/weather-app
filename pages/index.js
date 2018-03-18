// @flow

import React from 'react';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import Router from 'next/router';

import getWeatherData from '../utils/weatherApi';
import getWeatherIconClass from '../utils/weatherIconClassMap';
import WeatherItem from '../components/WeatherItem';
import Searchbox from '../components/Searchbox';
import Selectbox from '../components/Selectbox';
import RefreshSvgIcon from '../components/RefreshSvgIcon';
import type { Location, WeatherDataItem } from '../utils/flowTypes';

type Props = {
  weatherData: {
    location: Location,
    item: WeatherDataItem,
  },
  hasError: boolean,
};

type State = {
  selectedWeatherItemIndex: number,
  weatherData: {
    location: Location,
    item: WeatherDataItem,
  },
  hasError: boolean,
};

class Index extends React.Component<Props, State> {
  static async getInitialProps(context: { query: Object }) {
    try {
      const { location = 'tokyo' } = context.query;
      const weatherDataResponse = await fetch(getWeatherData(location));
      const weatherDataJsonResponse = await weatherDataResponse.json();
      const resultCount = weatherDataJsonResponse.query.count;
      return {
        weatherData: resultCount ? weatherDataJsonResponse.query.results.channel : undefined,
        hasError: !resultCount,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return {
        hasError: true,
      };
    }
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      weatherData: props.weatherData,
      selectedWeatherItemIndex: 0,
      hasError: props.hasError,
    };
  }

  onSearch = async (location: string) => {
    if (!location) {
      return;
    }
    const href = `/?location=${location}`;
    const as = href;
    // Change Url without requesting the page again
    Router.push(href, as, { shallow: true });
    try {
      const weatherDataResponse = await fetch(getWeatherData(location));
      const weatherDataJsonResponse = await weatherDataResponse.json();
      const resultCount = weatherDataJsonResponse.query.count;
      this.setState({
        weatherData: resultCount ? weatherDataJsonResponse.query.results.channel : undefined,
        hasError: !resultCount,
      });
    } catch (err) {
      this.setState({
        hasError: true,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <Searchbox onSearch={this.onSearch} />
          <Selectbox onSelect={this.onSearch} />
          <RefreshSvgIcon
            onRefresh={() => {
              // TODO Paipo: Add interaction for refresh
              const location = this.state.weatherData.location.city;
              this.onSearch(location);
            }}
          />
        </header>
        {!this.state.hasError ? (
          <div className="mainWrapper">
            <section className="currentConditionContainer">
              <h1 className="mainTitle">{this.state.weatherData.location.city}</h1>

              <p className="subtitle">
                <span className="country">{this.state.weatherData.location.country}</span>
                <span className="date">
                  {moment(
                    this.state.weatherData.item.condition.date,
                    'ddd, DD MMM YYYY HH:mm A',
                  ).format('MMM DD')}
                </span>
              </p>

              <article className="weatherCondition">
                <h2 className="degree">
                  <span>{this.state.weatherData.item.condition.temp}&#176;</span>
                  <i
                    className={`wi ${getWeatherIconClass(this.state.weatherData.item.condition.code)} weatherIcon`}
                  />
                </h2>
                <div>{this.state.weatherData.item.condition.text}</div>
              </article>
            </section>
            <section className="forecastContainer">
              {this.state.weatherData.item.forecast.map((weatherItem, index) => (
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
                    {...weatherItem}
                    isSelected={index === this.state.selectedWeatherItemIndex}
                  />
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="errorWrapper">Something Wrong, please try again later!</div>
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
              animation-name: lazyload;
              animation-duration: 1s;
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
            }
            .subtitle {
              text-align: center;
              font-weight: 400;
              font-style: italic;
            }
            .country {
              margin-right: 20px;
            }
            .degree {
              font-size: 60px;
              margin: 0 0 10px 0;
            }
            .weatherIcon {
              vertical-align: middle;
              color: #ffffff;
              margin-left: 20px;
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
              animation-name: lazyload;
              animation-duration: 1s;
            }

            @keyframes lazyload {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            .errorWrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: auto;
              color: #ffffff;
              font-size: 36px;
              max-width: 900px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
