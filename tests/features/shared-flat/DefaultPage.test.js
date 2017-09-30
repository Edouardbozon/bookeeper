import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/shared-flat/DefaultPage';

describe('shared-flat/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      sharedFlat: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.shared-flat-default-page').node
    ).to.exist;
  });
});
