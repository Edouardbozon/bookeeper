import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Event } from 'src/features/shared-flat';

describe('shared-flat/Event', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Event />
    );

    expect(
      renderedComponent.find('.shared-flat-event').getElement()
    ).to.exist;
  });
});
