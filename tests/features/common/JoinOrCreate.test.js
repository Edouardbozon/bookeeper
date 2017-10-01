import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { JoinOrCreate } from 'src/features/common/JoinOrCreate';

describe('common/JoinOrCreate', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <JoinOrCreate {...props} />
    );

    expect(
      renderedComponent.find('.common-join-or-create').node
    ).to.exist;
  });
});
