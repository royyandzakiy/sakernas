import React, { Component } from 'react';
import './main.css';
import $ from 'jquery';

// table stuff
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// ----DATA
//    data ini akan di load setelah tombol 'refresh' ditekan
//    GET data berdasarkan parameter pada input box
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
class Entri_p extends Component {
  constructor(props) {
    super(props);
    this.data_temp={};

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8000/notes/5a64975b7a768503007f22c9",
      "method": "GET",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "d9510c00-b936-41e9-9848-e906c4096211"
      },
      "data": {
        "title": "Second Note",
        "body": "ubah isinya, mantap juga sih"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

  }

  render() {
    return (
      <BootstrapTable data={ pemutakhiran } deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } cellEdit={ cellEditProp } version='4' striped hover condensed >
          <TableHeaderColumn width='150' dataAlign='center' dataField='no' isKey >No</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='left' dataField='kode_kec'>Kecamatan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='kode_desa'>Desa/Kelurahan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='nks'>NKS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='sls'>SLS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='status_dok'>Status Dok</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Entri_p;
