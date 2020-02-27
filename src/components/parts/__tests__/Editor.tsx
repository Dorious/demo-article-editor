import React from 'react';
import Editor from '../Editor';
import { render } from '@testing-library/react';
import themes from '../../../themes';
import { ThemeProvider } from 'styled-components';
import { AppContext, AppProvider } from '../../../App';
import reducer from '../../../reducer';
import fakeState from '../../../__mocks__/fullLoadedPage.json';

describe('<Editor>', () => {
  test('should render', () => {
    const wrapper = render(<Editor />);
    expect(wrapper.container).toBeInstanceOf(HTMLDivElement);
  });

  test('should render with theme', () => {
    const wrapper = render(<ThemeProvider theme={themes.light}>
      <Editor />
    </ThemeProvider>);
    expect(wrapper.container).toBeInstanceOf(HTMLDivElement);
  })

  test('should render article with theme and app context', () => {
    const wrapper = render(<AppProvider initialState={fakeState} reducer={reducer} >
      <ThemeProvider theme={themes.light}>
        <Editor />
      </ThemeProvider>
    </AppProvider>);

    expect(wrapper.getAllByText('Staffordshire Terrier Pups')).toBeInstanceOf(HTMLHeadingElement);
    expect(wrapper.container).toBeInstanceOf(HTMLDivElement);
  });
})