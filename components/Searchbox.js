// @flow
import * as React from 'react';

type Props = {
  onSearch: Function,
};

type State = {
  location: string,
};

class Searchbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: '',
    };
  }
  render() {
    return (
      <div className="searchboxContainer">
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
          onKeyPress={evt => {
            if (evt && evt.key === 'Enter') {
              this.props.onSearch(this.state.location);
              this.setState({ location: '' });
            }
          }}
        />
        <button
          className="searchBtn"
          onClick={() => {
            this.props.onSearch(this.state.location);
            this.setState({ location: '' });
          }}
        >
          Search
        </button>
        <style jsx>
          {`
            .searchboxContainer {
              width: 600px;
              display: flex;
              margin-left: 15px;
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
          `}
        </style>
      </div>
    );
  }
}

export default Searchbox;
