import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './redux/reducers';
import { createLogger } from 'redux-logger';
import apiMiddleware from './redux/middlewares/apiMiddleware';
import { loadState, saveState } from './redux/localStorage';

const logger = createLogger();
const persistedState = loadState();
const Store = createStore(
  reducer,
  persistedState,
  compose(
    applyMiddleware(logger, apiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
Store.subscribe(() => {
  saveState(Store.getState());
});

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
