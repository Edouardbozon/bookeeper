import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/hello/DefaultPage';

describe('hello/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      hello: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.hello-default-page').node
    ).to.exist;
  });
});
