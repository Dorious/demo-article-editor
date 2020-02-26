import { useEffect, useRef } from 'react';
import { IAppState } from './reducer';

export const APP_LOCAL_STORAGE = '__appState';

export interface StringIndex {
  [index: string]: any
}

export const hex2rgba = (hex: string, alpha = 1) => {
  let regexp = hex.length > 4 ? '\\w\\w' : '\\w';

  const [r, g, b] = hex.match(new RegExp(regexp, 'g')).map((x: string) => {
    return x.length >= 2 ? parseInt(x, 16) : parseInt(`${x}${x}`, 16);
  });

  return `rgba(${r},${g},${b},${alpha})`;
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const saveLocalState = (state: IAppState) => {
  let newState: any = {...state, router: null};
  return sessionStorage.setItem(APP_LOCAL_STORAGE, JSON.stringify(newState))
}

export const getLocalState = (initialState: IAppState): IAppState => {
  let state = sessionStorage.getItem(APP_LOCAL_STORAGE);
  return state ? JSON.parse(state) : initialState;
}