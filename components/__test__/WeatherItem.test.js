import renderer from 'react-test-renderer';
import React from 'react';

import WeatherItem from '../WeatherItem';

describe('Pages With Snapshot Testing', () => {
  it('snapshot WeatherItem Component', () => {
    const testProps = {
      code: '25',
      day: 'Tue',
      high: 15,
      low: 10,
    };
    const component = renderer.create(<WeatherItem {...testProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
