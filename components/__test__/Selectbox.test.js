import renderer from 'react-test-renderer';
import React from 'react';

import Selectbox from '../Selectbox';

describe('Pages With Snapshot Testing', () => {
  it('snapshot Selectbox Component', () => {
    const component = renderer.create(<Selectbox />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
