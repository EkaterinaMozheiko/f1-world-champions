import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './store';

import './index.css';

function renderApp() {
  const rootDiv = document.createElement('div');

  rootDiv.style.width = '100%';
  rootDiv.style.height = '100%';

  document.body.append(rootDiv);

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    rootDiv,
  );
}

renderApp();
