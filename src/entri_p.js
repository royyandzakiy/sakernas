import React, { Component } from 'react';
import './css/main.css';

// table stuff
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

// ----DATA
//    data ini akan di load setelah tombol 'refresh' ditekan
//    GET data berdasarkan parameter pada input box
var pemutakhiran = [];
pemutakhiran = [{
      kode_prov: 99,
      kode_kab: 9,
      kode_kec: 99,
      kode_desa: 99,
      nks: 99999,
      semester: 9,
      nort: 9,
      id_user: 9999999,
      status_dok: '9',
      //--data lain--
      sls: 9,
      nbf: 9,
      nbs: 0,
      nama_krt: '999999',
      alamat: 'DUSUN 999999',
      keberadaan_rt: '',
      nurt: 9,
      jml_art: 9
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

$.ajax(settings).done(function (dataku) {
  console.log("Inilah dataku: " + dataku[1]["semester"]);
});


// ----MAIN APP
class Entri_p extends Component {

  remote(remoteObj) {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  render() {
    return (
      <div id="container" class="col-lg-10">
      <table id="entri-p" class="table-striped table table-bordered table-hover" >
          <thead>
              <tr>
                  <th>no</th>
                  <th>kode_kec</th>
                  <th>kode_desa</th>
                  <th>nks</th>
                  <th>sls</th>
                  <th>status_dok</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>90890</td>
                  <td>9980</td>
                  <td>80980</td>
                  <td>980980</td>
                  <td>c</td>
              </tr>
          </tbody>
      </table>
      </div>
    );
  }
}

export default Entri_p;
