import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/signup/DefaultPage';

describe('signup/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      signup: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.signup-default-page').node
    ).to.exist;
  });
});
