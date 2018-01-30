import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Entri_p from './entri_p';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
