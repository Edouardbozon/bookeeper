import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SharedFlatList } from 'src/features/shared-flat/SharedFlatList';

describe('shared-flat/SharedFlatList', () => {
  it('renders node with correct class name', () => {
    const props = {
      sharedFlat: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SharedFlatList {...props} />
    );

    expect(
      renderedComponent.find('.shared-flat-shared-flat-list').node
    ).to.exist;
  });
});
