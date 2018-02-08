import React, { Component } from 'react';
import './css/navbar.css';

//pages
import Main from './main';
import Entri_p from './entri_p';
import Entri_p_form from './entri_p_form';
import Dsrt from './dsrt';
import Ruta from './ruta';
import Petugas_lap from './petugas_lap';

//dependencies
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// ----NAVBAR
class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
      <div>

      <nav class="navbar navbar-findcond">
          <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link to="/" class="navbar-brand">Sakernas</Link>
          </div>
          <div class="collapse navbar-collapse" id="navbar">
            <ul class="nav navbar-nav navbar-right">

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-fw fa-bell-o"></i> Entri <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">

                  <li><Link to="/pemutakhiran"><i class="fa fa-fw fa-tag"></i> <span class="badge">Entri</span> Pemutakhiran<span class="sr-only">(current)</span></Link></li><li>

                  <Link to="/dsrt"><i class="fa fa-fw fa-tag"></i> <span class="badge">Entri</span> DSRT</Link></li><li>

                  <Link to="/ruta"><i class="fa fa-fw fa-tag"></i> <span class="badge">Entri</span> Ruta</Link></li>

                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-fw fa-bell-o"></i>Master <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><Link to="/petugas-lap">Petugas Lapangan</Link></li>
                  <li><Link to="/">Pengguna</Link></li>
                  <li class="disabled"><Link to="/">Wilayah</Link></li>
                  <li class="disabled"><Link to="/">Wilayah Sampel</Link></li>
                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-fw fa-bell-o"></i>Rekap <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><Link to="/">Progres Entri</Link></li>
                  <li class="disabled"><Link to="/">Operator</Link></li>
                  <li class="disabled"><Link to="/">Pengguna</Link></li>
                  <li><Link to="/">Cek Kewajaran</Link></li>
                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-fw fa-bell-o"></i>Utilitas <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><Link to="/">Revalidasi</Link></li>
                  <li><Link to="/">Setujui Data</Link></li>
                  <li class="disabled"><Link to="/">Weighting</Link></li>
                  <li class="disabled"><Link to="/">Derivasi</Link></li>
                </ul>
              </li>

              <li class="dropdown disabled">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-fw fa-bell-o"></i>User Support</a>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Admin <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><Link to="/account">Account</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Route exact path="/" component={Main}/>
      <Route path="/pemutakhiran" component={Entri_p}/>
      <Route path="/dsrt" component={Dsrt}/>
      <Route path="/ruta" component={Ruta}/>
      <Route path="/petugas-lap" component={Petugas_lap}/>
      <Route path="/account" component={Main}/>
      <Route path="/logout" component={Main}/>
      </div>
      </Router>
    );
  }
}

export default Navbar;
