export interface ITheme {
  bodyColor: string;       // Body font color
  bodyBackground: string;  // Body background
  spinnerColor: string;    // Spinner ball color
  transitionTime: number;  // Base transitionTime
  paperBackground: string; // Papers color
}

export interface IThemeDescription {
  name: string,
  theme: ITheme,
}

export const light: IThemeDescription = {
  name: 'Light',
  theme: {
    bodyColor: '#222',
    bodyBackground: '#e1e1e1',
    spinnerColor: '#008',
    transitionTime: 0.25,
    paperBackground: '#fff'
  }
}

export const dark: IThemeDescription = {
  name: 'Dark',
  theme: {
    ...light.theme,
    bodyColor: '#e1e1e1',
    bodyBackground: '#222',
    paperBackground: '#666'
  }
}

export default { light, dark }