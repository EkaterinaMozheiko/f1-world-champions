# Documentation

## How to start

```
npm install
npm run start
```

## Chosen tools

- React. I prefer this library for UI development and have extended experience with it.
- Webpack. I decided to set my own webpack config to take full control under my settings and dependencies (instead of Create React App).
- Jest. Just the standard of unit-testing in JS word.
- React-testing-library (RTL). I like this approach for testing, which is about testing the business logic without touching implementation details. We check the exactly how the user would be use our component.
- Redux Toolkit. It has convenient toolset for Redux development.
- Redux-saga. It is used to handle side effects. It was picked as a tool I have experience with.
- SCSS modules. Just simple usage of CSS but with unique styles name.
- Eslint, Prettier. It is always nice to automatize routine work to concentrate on important stuff.
- Axios. It gives a convenient wrapper under fetch interface.
- React-router-dom. Below I will explain why this routing is needed :)

## Project structure:

- assets - for icons.
- components - for common dumb view components, which are not connected with particular feature. Placed here general components like spinner, header, and table.
- modules - for components and logic dedicated to business domain features. It includes reducers, models, sagas, styles, and components. I have two parts of the app here: part with world champions list and part with list of races and winners of the year.
- pages - root components aggregating other ones. For the app I have only one main page.
- helpers - simple utilities which are used among the whole app. Here is the DRY principle.

For bigger projects, I would create a models directory to keep models which are used among the whole app. But in this case I have only one type (for loading state) so I decided to create the only one file in `/src`.

`vars.css` file keeps all used colors in one place. This approach helps to manipulate CSS properties in the application easier.

Creating this structure, I tried to stick to `Separation of concerns` principle.

## Development

Decided to create two independent modules which depend on outer single source of truth. For this purpose, React-router was chosen. When the user select world champion in the list, the page is redirected from `/` to `/${year}` and content with winners during the season is updated. Moreover, the user can copy an URL with specific year and open it in a new tab with selected year.

## Browser support

Added `Autoprefixer` plugin to support style prefixes for all popular browsers automatically.

The app was checked in the following browsers:

1. Chrome
2. Firefox
3. Edge

Unfortunately, I don't have an opportunity to test it in Safari (laptop OS is Linux)
