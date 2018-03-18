import renderer from 'react-test-renderer';
import React from 'react';

import Searchbox from '../Searchbox';

describe('Pages With Snapshot Testing', () => {
  it('snapshot Searchbox Component', () => {
    const component = renderer.create(<Searchbox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
