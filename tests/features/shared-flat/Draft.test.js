import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Draft } from 'src/features/shared-flat';

describe('shared-flat/Draft', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Draft />
    );

    expect(
      renderedComponent.find('.shared-flat-draft').getElement()
    ).to.exist;
  });
});
