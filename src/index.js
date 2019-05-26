/* @jsx h */
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import 'preact/devtools';

import store from './store';
import ListPage from './components/pages/list-page';

import './styles/index.scss';

render(
  <Provider store={store}>
    <ListPage />
  </Provider>,
  document.body
);
