# Demo Article Editor

Another code for demo.

## Install

Checkout the stuff and:

```
$ npm install
$ npm start
```

Look up the browser if it doesn't pop up.

## Techs/libs
1. React (with Hooks and custom reducer, context, router)
2. `create-react-app` for base.
3. `styled-components` (tried out theming, probably would be better to move to `.attrs`).
4. `antd` for some UI stuff.
5. `axios` for requests.

## Structure

Most important stuff:

```
src/
  components/
    layouts/      - All content layout related stuff.
      elements/   - Render elements for specific content elements.
    parts/        - Parts of the application like top header etc.
  actions.ts      - Actions
  reducer.ts      - General reducer
  interfaces.ts   - Currently holdes IArticle which should be generic IContent prepared for other content types
  themes.ts       - Themes declaration
```


## Comments
1. I did it as the `Article` is the only Content type. What would be good is to build common interface/components for Content-type (I see that they are kind of Element instances with elementType and value(s) + additional params. Check `./src/interfaces`), and then build rendering on it.
2. Retrived jsons could be validated by interface with type guard (https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).
3. Be more strict with TS. To many `any`s even for `IArticle` I already have :P