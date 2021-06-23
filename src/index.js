import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'


ReactDOM.render(
  <React.StrictMode>
  <p> Weather APP <FontAwesomeIcon icon={faCloud} size="1x" className="cloud" />  </p>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

