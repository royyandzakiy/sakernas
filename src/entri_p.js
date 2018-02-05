import React, { Component } from 'react';
import './css/main.css';

// table stuff
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// ----DATA
//    data ini akan di load setelah tombol 'refresh' ditekan
//    GET data berdasarkan parameter pada input box
var data = [{}];
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

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
  mode: 'checkbox'
};

function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}

function onAfterDeleteRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The deleted row is:\n ' + newRowStr);
}

const options = {
  afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow
};

var settings = {
"async": true,
"crossDomain": true,
"url": "http://localhost:8002/pemutakhiran",
"method": "GET",
"headers": {
  "content-type": "application/x-www-form-urlencoded",
  "cache-control": "no-cache",
  "postman-token": "a7fad470-f7a5-ec21-2aa5-4bd2f532cd6b"
}
}

$.ajax(settings).done(function (response) {
  console.log("Royyan: " + response);
  data = response;
});


// ----MAIN APP
class Entri_p extends Component {
  constructor(props) {
    super(props);
  }

  remote(remoteObj) {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  render() {
    return (
      <div>
      <BootstrapTable data={ pemutakhiran } deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } cellEdit={ cellEditProp } options={ options } version='4' striped hover condensed >
          <TableHeaderColumn width='150' dataAlign='center' dataField='no' isKey >No</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='left' dataField='kode_kec'>Kecamatan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='kode_desa'>Desa/Kelurahan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='nks'>NKS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='sls'>SLS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='status_dok'>Status Dok</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}

export default Entri_p;
