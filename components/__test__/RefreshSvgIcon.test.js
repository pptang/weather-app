import renderer from 'react-test-renderer';
import React from 'react';

import RefreshSvgIcon from '../RefreshSvgIcon';

describe('Pages With Snapshot Testing', () => {
  it('snapshot RefreshSvgIcon Component', () => {
    const component = renderer.create(<RefreshSvgIcon />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
