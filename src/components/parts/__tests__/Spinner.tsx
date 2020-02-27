import React from 'react';
import Spinner from '../Spinner';
import { render } from '@testing-library/react';

describe('<Spinner>', () => {
  test('should render', () => {
    const wrapper = render(<Spinner></Spinner>);
    expect(wrapper.container).toBeInstanceOf(HTMLDivElement);
  })
})