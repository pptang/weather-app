// @flow

import React from 'react';
import fetch from 'isomorphic-unfetch';

import getWeatherData from '../utils/weatherApi';
import getWeatherIconClass from '../utils/weatherIconClassMap';
import WeatherItem from '../components/WeatherItem';

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
  selectedForecastIndex: number,
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
      weatherData: props.weatherData,
      selectedForecastIndex: 0,
    };
  }

  onSearch = async () => {
    const weatherDataResponse = await fetch(getWeatherData(this.state.location));
    const weatherDataJsonResponse = await weatherDataResponse.json();
    this.setState({
      weatherData: weatherDataJsonResponse.query.count
        ? weatherDataJsonResponse.query.results.channel.item
        : undefined,
    });
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <input
            className="searchInput"
            type="text"
            placeholder="Input your location"
            value={this.state.location}
            onChange={event => {
              this.setState({
                location: event.target.value,
              });
            }}
          />
          <button className="searchBtn" onClick={this.onSearch}>
            Search
          </button>
        </header>
        {this.state.weatherData ? (
          <div className="mainWrapper">
            <section className="currentConditionContainer">
              <h1 className="mainTitle">{this.state.weatherData.title}</h1>
              <article className="weatherCondition">
                <h2 className="degree">
                  <span>{this.state.weatherData.condition.temp}&#176;</span>
                  <i
                    className={`wi ${getWeatherIconClass(this.state.weatherData.condition.code)} weatherIcon`}
                  />
                </h2>
                <div>{this.state.weatherData.condition.text}</div>
              </article>
            </section>
            <section className="forecastContainer">
              {this.state.weatherData.forecast.map((weatherItem, index) => (
                <WeatherItem
                  key={weatherItem.date}
                  code={weatherItem.code}
                  day={weatherItem.day}
                  high={weatherItem.high}
                  low={weatherItem.low}
                  isSelected={index === this.state.selectedForecastIndex}
                />
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
            }
            .header {
              height: 50px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .searchInput {
              background-color: #ffffff;
              border: 0;
              border-radius: 5px;
              flex: 1;
              height: 30px;
              max-width: 600px;
              padding-left: 10px;
              transition: border 0.3s ease-out;
            }
            .searchInput:focus {
              border: 1px solid #cccccc;
            }
            .searchBtn {
              border: 0;
              border-radius: 4px;
              cursor: pointer;
              margin-left: 10px;
              height: 30px;
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
              color: #ffffff;
            }
            .forecastContainer {
              display: flex;
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
