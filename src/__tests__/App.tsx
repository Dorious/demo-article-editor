import React from 'react';
import { render } from '@testing-library/react';
import App, { AppProvider, AppContext } from '../App';
import reducer, { IAppState } from "../reducer";

import fullLoadedPage from '../__mocks__/fullLoadedPage.json';

describe('The App', () => {
  describe('AppProvider', () => {
    
    test('Should render with injected state', () => {
      const app = render(
        <AppProvider 
          reducer={reducer} 
          initialState={fullLoadedPage}
        >
          <App />
        </AppProvider>
      );
      
      expect(app.container).toBeInstanceOf(HTMLDivElement);
    });

  });
});
