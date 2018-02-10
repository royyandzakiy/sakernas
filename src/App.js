import React, { Component } from 'react';
import './css/App.css';

// dependency

// pages
import Navbar from './navbar';

// ----MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      <Navbar />

      </div>
    );
  }
}

export default App;
