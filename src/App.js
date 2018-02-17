import React, { Component } from 'react';
import './css/App.css';

// dependency

// pages
import Navbar from './navbar';
import Login from './login';

// ----MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
    this.loggedHandler = this.loggedHandler.bind(this);
  }

  loggedHandler(childComponent) {
    this.setState({
      logged:childComponent.target.value
    });
    return this.state.logged;
  }

  render() {
    return (
      <div>

      {this.state.logged ? <Navbar /> : <Login logged={this.loggedHandler.bind(this)} />}

      </div>
    );
  }
}

export default App;
