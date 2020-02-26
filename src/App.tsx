import React, { useReducer, useContext, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider, ThemeProps } from 'styled-components';
import { BaseAction, updateRouter, loadPublishedArticles, loadArticle } from './actions';
import reducer, { initialState, IAppState } from "./reducer";
import themes, { ITheme } from './themes';
import { StringIndex, usePrevious, saveLocalState } from './utils';
import './antd.css'; // <- this us ugly but don't wanna fight antd conf now.
import { createBrowserHistory } from 'history';

import Editor from './components/parts/Editor';
import Header from './components/parts/Header';

const INITIAL_ARTICLE='fa9519d5-0363-4b8d-8e1f-627d802c08a8';
const DEFAULT_THEME='light';

/**
 * Not using react-router just `history` and making it go into our AppContext later
 */
const router = createBrowserHistory();

const AppBody = styled.div`
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: ThemeProps<ITheme>) => props.theme.bodyBackground};
    color: ${(props: ThemeProps<ITheme>) => props.theme.bodyColor};
    transition: color .25s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props: ThemeProps<ITheme>) => props.theme.bodyColor};
    transition: color .25s ease;
  }

  *[contenteditable="true"] {
    outline: 1px solid #e1e1e1;
  }
`;

const defaultContext: [any, React.Dispatch<BaseAction | Promise<any>>] = [initialState, (action) => null];
export const AppContext = React.createContext(defaultContext);
AppContext.displayName = "AppContext";

// Context provider
export interface IAppProvider {
  reducer: any;
  initialState: IAppState;
  children: any;
}
export const AppProvider = ({reducer, initialState, children}: IAppProvider) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

const getThemeByName = (name: string = DEFAULT_THEME) => {
  const availableThemes = Object.keys(themes);
  const usedTheme = availableThemes.indexOf(name) < 0 ? DEFAULT_THEME : name;
  const idxThemes = themes as StringIndex;
  return idxThemes[usedTheme]['theme'];
}

function App() {
  const [state, dispatch] = useContext(AppContext);
  let prevRouter: any = usePrevious(state.router);

  /**
   * This should be refactored
   */
  useEffect(() => {
    // Setup the router update
    if(!state.router) {
      console.log('Setting up the router...');

      dispatch(updateRouter({...router}));

      router.listen(() => {
        dispatch(updateRouter({...router}));
      });
    };

    // If no id set, set it
    if(state.router && !state.router.location.qs.id)
      state.router.replace(`/?id=${INITIAL_ARTICLE}`);

    // Load list of published articles
    if(state.loadingArticles === undefined)
      loadPublishedArticles(dispatch);

    // React on route change for articles
    // First if no previous history read current url
    if(!prevRouter && state.router) {
      loadArticle(state.router.location.qs.id, dispatch);
    } else if(
      prevRouter && state.router && 
      prevRouter.location.key !== state.router.location.key
    ) {
      loadArticle(state.router.location.qs.id, dispatch);
    }

    // Save the state to localStorage
    saveLocalState(state);
    
  }, [prevRouter, dispatch, state]);

  return (
    <ThemeProvider theme={getThemeByName(state.theme)}>
      <GlobalStyle />
      <AppBody>
        <Header />
        <Editor />
      </AppBody>
    </ThemeProvider>
  )
}

const AppContainer: React.FC = () => {
  return (
    <AppProvider 
      reducer={reducer} 
      initialState={initialState}
    >
      <App />
    </AppProvider>
  );
}



export default AppContainer;
