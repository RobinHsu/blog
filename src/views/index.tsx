import * as React from 'react';
import * as ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './scss/home.scss';

ReactDom.hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
