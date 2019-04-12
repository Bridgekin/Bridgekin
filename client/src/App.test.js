import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let store = configureStore({});
  ReactDOM.render(<div store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
