import { getLocalState } from "./utils";

export interface IAppState {
  theme: string;
  editMode: boolean;
  router: any;
  article: object | null;
  articles: object[];
  loadingArticle: boolean;
  loadingArticles: boolean;
  pageError?: string;
  showPageError?: boolean;
}

export let initialState: IAppState = {
  theme: 'light',
  editMode: false,
  router: null,
  article: null,
  articles: [],
  loadingArticles: undefined,
  loadingArticle: undefined,
  showPageError: false,
}

//initialState = getLocalState(initialState); 

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
    
    case 'toggleEdit':
      return {
        ...state,
        editMode: !state.editMode
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
    
    case 'errorMessage':
      return {
        ...state,
        pageError: action.payload,
        showPageError: true,
      }
    
    case 'hideErrorMessage':
      return {
        ...state,
        showPageError: false,
      }

    default:
      return state;
  }
};