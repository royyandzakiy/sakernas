import React, { Component } from 'react';
import $ from 'jquery';
import './css/login.css';
import logo from './logo.png';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// ----MAIN APP
class Register extends Component {

  constructor(props) {
      super(props);
      this.register = this.register.bind(this);
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.state = {
          username: '',
          password: '',
          showTaken: false,
          showAvail: false
      };
  }

  register(e) {
      e.preventDefault();
      var username = this.state.username;
      var password = this.state.password;

      var query = {
        username: username,
        password: password
      }

      $.post("http://localhost:8002/register",
          query,
          function(data, status) {
              alert(JSON.stringify(data));
          });
  }

  handleUsername(e){
    if (e.target.value == '')
        this.setState({
          showTaken: false,
          showAvail: false
        });
    else
    this.setState({
        username: e.target.value
    }, () => {
      var username = this.state.username;

      var query = {
        username: username
      }

      if(username != '')
        $.post("http://localhost:8002/check-user-avail",
            query,
            function(data, status) {
                if(data.length != 0)
                  this.setState({
                      showTaken: true,
                      showAvail: false
                  });
                else
                this.setState({
                    showTaken: false,
                    showAvail: true
                });
                  // Router.transitionTo('/pemutakhiran',query={keyword:''}); // masih gagal
            }.bind(this));
    });
  }

  handlePassword(e){
    this.setState({
        password: e.target.value
    });
  }

  render() {
    return (
      <div id="container" class="col-lg-12">
      <div class="card card-container">
          <img id="profile-img" class="profile-img-card" src={logo} />
          <p id="profile-name" class="profile-name-card"></p>
          <form class="form-signin">
              <h3>Register</h3>
              <span id="reauth-email" class="reauth-email"></span>
              <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus defaultValue={this.state.username} onChange={this.handleUsername} />{ this.state.showTaken ? <p>Username already taken</p> : null }{this.state.showAvail ? <p>Username Available</p> : null}
              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required defaultValue={this.state.password} onChange={this.handlePassword} />
              <div id="remember" class="checkbox">
                  <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                  </label>
              </div>
              { this.state.showAvail ? <button class="btn btn-lg btn-primary btn-block btn-signin" onClick={this.register.bind(this)}>Register</button> : null }
          </form>
      </div>
      </div>
    );
  }
}

export default Register;
