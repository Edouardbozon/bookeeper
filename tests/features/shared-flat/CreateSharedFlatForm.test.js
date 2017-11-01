import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CreateSharedFlatForm } from 'src/features/shared-flat/CreateSharedFlatForm';

describe('shared-flat/CreateSharedFlatForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      sharedFlat: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateSharedFlatForm {...props} />
    );

    expect(
      renderedComponent.find('.shared-flat-create-shared-flat-form').node
    ).to.exist;
  });
});
