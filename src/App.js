import React, { Component } from 'react';
import './css/App.css';

// dependency

// pages
import Navbar from './navbar';
import Test from './test';

// ----MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      <Test />

      </div>
    );
  }
}

export default App;
