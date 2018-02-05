import React, { Component } from 'react';
import './css/App.css';

// dependency
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// pages
import Navbar from './navbar';
import Entri_p from './entri_p';
import Main from './main';

//
// ----DATA
//    data ini akan di load setelah tombol 'refresh' ditekan
//    GET data berdasarkan parameter pada input box
/*
var pemutakhiran = [{
      kode_prov: 11,
      kode_kab: 1,
      kode_kec: 20,
      kode_desa: 35,
      nks: 10060,
      semester: 1,
      nort: 1,
      id_user: 11010001,
      status_dok: 'C',
      //--data lain--
      sls: 4,
      nbf: 8,
      nbs: 8,
      nama_krt: 'JOHERAN',
      alamat: 'DUSUN SEULANGA',
      keberadaan_rt: '',
      nurt: 3,
      jml_art: 2
    },{
      kode_prov: 11,
      kode_kab: 1,
      kode_kec: 20,
      kode_desa: 30,
      nks: 15029,
      semester: 1,
      nort: 1,
      id_user: 11010001,
      status_dok: 'C',
      //--data lain--
      sls: 4,
      nbf: 8,
      nbs: 8,
      nama_krt: 'JOHERAN',
      alamat: 'DUSUN TAUHAO',
      keberadaan_rt: '',
      nurt: 3,
      jml_art: 2
    },{
      kode_prov: 11,
      kode_kab: 1,
      kode_kec: 20,
      kode_desa: 35,
      nks: 15013,
      semester: 1,
      nort: 1,
      id_user: 11010001,
      status_dok: 'C',
      //--data lain--
      sls: 4,
      nbf: 8,
      nbs: 8,
      nama_krt: 'JOHERAN',
      alamat: 'DUSUN MAWAR',
      keberadaan_rt: '',
      nurt: 3,
      jml_art: 2
    }]
//*/
// ---FUNCTIONS
const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true
};

const options = {
  // empty
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

// ----MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
    this.data_temp={};
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
