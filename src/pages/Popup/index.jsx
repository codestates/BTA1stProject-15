import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Popup from './Popup';
import './index.css';

render(
  <MemoryRouter>
    <Popup />
  </MemoryRouter>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
