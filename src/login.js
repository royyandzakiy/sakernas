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
class Login extends Component {

  constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.state = {
          username: '',
          password: ''
      };
  }

  login(e) {
      e.preventDefault();
      var username = this.state.username;
      var password = this.state.password;

      var query = {
        username: username,
        password: password
      }

      $.post("http://localhost:8002/login",
          query,
          function(data, status) {
              if(!data['registered'])
                return alert('Wrong Username / Password combination');
              else
                alert('You have logged in');
                // Router.transitionTo('/pemutakhiran',query={keyword:''}); // masih gagal
          });
  }

  handleUsername(e){
    this.setState({
        username: e.target.value
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
              <h3>Login</h3>
              <span id="reauth-email" class="reauth-email"></span>
              <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus defaultValue={this.state.username} onChange={this.handleUsername} />
              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required defaultValue={this.state.password} onChange={this.handlePassword} />
              <div id="remember" class="checkbox">
                  <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                  </label>
              </div>
              <button class="btn btn-lg btn-primary btn-block btn-signin" onClick={this.login.bind(this)}>Log in</button>
          </form>
      </div>
      </div>
    );
  }
}

export default Login;
