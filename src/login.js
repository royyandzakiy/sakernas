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
      this.login = this.login.bind(this);
      this.state = {
          logged:false,
          id_user:'',
          username:'',
          kode_prov:'',
          kode_kab:'',
          realname:'',
          userlevel:'',
      };
  }

  componentDidMount(){
    this.setState({
      logged:this.props.getState.logged,
      id_user:this.props.getState.id_user,
      username:this.props.getState.username,
      kode_prov:this.props.getState.kode_prov,
      kode_kab:this.props.getState.kode_kab,
      realname:this.props.getState.realname,
      userlevel:this.props.getState.userlevel,
    });
  }

  login(e) {
      e.preventDefault();
      var query = {
        username: this.state.username,
        password: this.state.password
      }

      $.post("https://sakernas-api.herokuapp.com/login",
          query,
          function(data, status) {
              if(!data[0].registered)
                return alert('Wrong Username / Password combination');
              else
                alert('You have logged in');
                this.setState({
                  logged:true,
                  id_user:data[0].id_user,
                  username:data[0].username,
                  kode_prov:data[0].kode_prov,
                  kode_kab:data[0].kode_kab,
                  realname:data[0].realname,
                  userlevel:data[0].userlevel
                });

                // alert("login page: "+JSON.stringify(this.state));

                this.props.changeState(this.state);
          }.bind(this));
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
