import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { IArticle } from './interfaces';

const API_KEY = '859f2008-a40a-4b92-afd0-24bb44d10124';
export const API_BASE = `https://my12.digitalexperience.ibm.com/api/${API_KEY}`;
const API_PUBLISHED = `${API_BASE}/delivery/v1/search?q=*:*&defType=edismax&indent=on\
  &qf=id+name%5E20+type%5E10+creator+lastModifier+text+text_ar+text_cjk+text_da+text_de+text_el+text_en+text_es+text_fi+text_fr+text_he+text_hi+text_it+text_ja+text_nl+text_no+text_pl+text_pt+text_pt_br+text_ru+text_sv+text_th+text_tr+text_zh_cn&wt=json&fq=classification:(content%20OR%20asset)&fq=type:(%22article%22)&fq=isManaged:(%22true%22)&fq=libraryId:(default%20OR%20ad4f44bf-edc0-466d-97b8-e1cd64af9efd)&sort=lastModified%20desc`;

const apiArticleUrl = (id: string) => {
  return `${API_BASE}/delivery/v1/content/${id}`;
}

export interface BaseAction {
  type: string;
  payload?: any;
}

export const updateRouter = (payload: any): BaseAction => {
  payload.location.qs = queryString.parse(payload.location.search);
  return {
    type: 'updateRouter',
    payload
  }
}

export const loadPublishedArticles = async (dispatch?: any) => {
  dispatch({
    type: 'setLoadingArticles',
    payload: true,
  });

  let response: AxiosResponse = await axios(API_PUBLISHED)
    .catch(

    );
  
  return Promise.resolve(dispatch({
    type: 'setPublishedArticles',
    payload: response.data
  }));
}

let axiosCancel: any = null;
export const loadArticle = async (id: string, dispatch?: any) => {
  dispatch({
    type: 'setLoadingArticle',
    payload: true,
  });

  // Cancel previous axios and prepare source
  if(axiosCancel) axiosCancel.cancel();
  axiosCancel = axios.CancelToken.source();

  let response: AxiosResponse = await axios(apiArticleUrl(id), {
      cancelToken: axiosCancel.token
  })
    .catch((err) => {
      if(axios.isCancel(err)) return false;
      return err;
    });
  
  if(response) {
    const payload = response.data as IArticle;

    return Promise.resolve(dispatch({
      type: 'setArticle',
      payload
    }));
  }
}