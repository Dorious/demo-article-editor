import { getLocalState } from "./utils";

export interface IAppState {
  theme: string;
  router: any;
  article: object | null;
  articles: object[];
  loadingArticle: boolean;
  loadingArticles: boolean;
  pageError?: ErrorConstructor;
}

export let initialState: IAppState = {
  theme: 'light',
  router: null,
  article: null,
  articles: [],
  loadingArticles: undefined,
  loadingArticle: undefined,
}

initialState = getLocalState(initialState); 

export default (state: any, action: any) => {
  switch (action.type) {
    case 'updateRouter':
      return {
        ...state,
        router: action.payload
      };

    case 'changeTheme':
      return {
        ...state,
        theme: action.payload
      }
    
    case 'setLoadingArticles':
      return {
        ...state,
        loadingArticles: action.payload
      }

    case 'setPublishedArticles':
      return {
        ...state,
        articles: action.payload.documents,
        loadingArticles: false,
      }

    case 'setLoadingArticle':
      return {
        ...state,
        loadingArticle: action.payload
      }

    case 'setArticle':
      return {
        ...state,
        article: action.payload,
        loadingArticle: false,
      }

    default:
      return state;
  }
};