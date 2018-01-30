import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Entri_p from './entri_p';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Entri = ({ match }) => (
  <div>
    <h2>Entri</h2>
    <ul>
      <li>
        <Link to={`${match.url}/entri-p`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/dsrt`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/entri-ruta`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

// MAINMENU = membuat path
const MainMenu = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/entri">Entri</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/entri" component={Entri}/>
    </div>
  </Router>
)
export default MainMenu
