import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Entri_p from './entri_p';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<Entri_p />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
