import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Dashboard } from 'src/features/shared-flat/Dashboard';

describe('shared-flat/Dashboard', () => {
  it('renders node with correct class name', () => {
    const props = {
      sharedFlat: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Dashboard {...props} />
    );

    expect(
      renderedComponent.find('.shared-flat-dashboard').node
    ).to.exist;
  });
});
