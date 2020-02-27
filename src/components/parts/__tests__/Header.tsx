import React from 'react';
import Header from '../Header';
import { render } from '@testing-library/react';

describe('<Header>', () => {
  test('should render', () => {
    const wrapper = render(<Header />);
    expect(wrapper.container).toBeInstanceOf(HTMLDivElement);
  })
})