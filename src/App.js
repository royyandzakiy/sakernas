import React, { Component } from 'react';
import './css/App.css';
// pages
import Navbar from './navbar';
import Login from './login';

// ----MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true,
      id_user:'',
      username:'',
      kode_prov:'',
      kode_kab:'',
      realname:'',
      userlevel:''
    }
    // alert('Awal '+this.state.logged);
    this.changeState = this.changeState.bind(this);
  }

  changeState(account) {
    this.setState({
      logged:account.status,
      id_user:account.id_user,
      username:account.username,
      kode_prov:account.kode_prov,
      kode_kab:account.kode_kab,
      realname:account.realname,
      userlevel:account.userlevel
    });

    // alert('Berubah, App page: '+JSON.stringify(account));
    // redirect
  }

  render() {
    return (
      <div>

      {this.state.logged ? <Navbar /> : <Login changeState={this.changeState.bind(this)} getState={this.state} />}

      </div>
    );
  }
}

export default App;
