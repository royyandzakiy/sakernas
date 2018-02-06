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

submit: function (e){
  var self

  e.preventDefault()
  self = this

  console.log(this.state);

  var data = {
      kode_prov: this.state.kode_prov,
      kode_kab: this.state.kode_kab,
      kode_kec: this.state.kode_kec,
      kode_desa: this.state.kode_desa,
      nks: this.state.nks,
      semester: this.state.semester,
      nort: this.state.nort,
      id_user: this.state.id_user,
      status_dok: this.state.status_dok,
      b3_r1a: this.state.b3_r1a,
      b3_r2a_tl: this.state.b3_r2a_tl,
      b3_r2a_bl: this.state.b3_r2a_bl,
      b3_r2a_th: this.state.b3_r2a_th,
      b3_r1b: this.state.b3_r1b,
      b3_r2b_tl: this.state.b3_r2b_tl,
      b3_r2b_bl: this.state.b3_r2b_bl,
      b3_r2b_th: this.state.b3_r2b_th,
      b4_rcat: this.state.b4_rcat,
      sls: this.state.sls,
      nbf: this.state.nbf,
      nbs: this.state.nbs,
      nama_krt: this.state.nama_krt,
      alamat: this.state.alamat,
      keberadaan_rt: this.state.keberadaan_rt,
      nurt: this.state.nurt,
      jml_art: this.state.jml_art,
    }

  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'http://localhost:8002/pemutakhiran',
  })
  .done(function(response) {
  console.log(response);

  // This is where I have the JSON response .How can I create a dynamic table from this response **strong text**and render in on UI.  //
  setf.setState({
    kode_prov: response.kode_prov,
    kode_kab: response.kode_kab,
    kode_kec: response.kode_kec,
    kode_desa: response.kode_desa,
    nks: response.nks,
    semester: response.semester,
    nort: response.nort,
    id_user: response.id_user,
    status_dok: response.status_dok,
    b3_r1a: response.b3_r1a,
    b3_r2a_tl: response.b3_r2a_tl,
    b3_r2a_bl: response.b3_r2a_bl,
    b3_r2a_th: response.b3_r2a_th,
    b3_r1b: response.b3_r1b,
    b3_r2b_tl: response.b3_r2b_tl,
    b3_r2b_bl: response.b3_r2b_bl,
    b3_r2b_th: response.b3_r2b_th,
    b4_rcat: response.b4_rcat,
    sls: response.sls,
    nbf: response.nbf,
    nbs: response.nbs,
    nama_krt: response.nama_krt,
    alamat: response.alamat,
    keberadaan_rt: response.keberadaan_rt,
    nurt: response.nurt,
    jml_art: response.jml_art,
  })
 }
 render() {
   return(
     <table>
       <thead>
          <tr>
             <th>Name</th>
             <th>ID</th>
             <th>Task</th>
          </tr>
       </thead>
       <tbody>
       {this.state.userData.map((data, key) => {
          return (
          <tr key={key}>
            <td>{data.name}</td>
            <td>{data.id}</td>
            <td>{data.task}</td>
          </tr>
          )
       })}
       </tbody>
     </table>

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
      <div id="container" class="col-lg-10">
      <BootstrapTable data={ pemutakhiran } deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } cellEdit={ cellEditProp } options={ options } version='4' striped hover condensed >
          <TableHeaderColumn width='150' dataAlign='center' dataField='no' isKey >No</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='left' dataField='kode_kec'>Kecamatan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='kode_desa'>Desa/Kelurahan</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='nks'>NKS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='sls'>SLS</TableHeaderColumn>
          <TableHeaderColumn width='150' dataAlign='center' dataField='status_dok'>Status Dok</TableHeaderColumn>
      </BootstrapTable>

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

      <script type="text/JavaScript">
          $('#entri-p > tbody:last-child').append('<tr>...</tr><tr>...</tr>');
          $('#entri-p > tbody:last-child').append('<tr>...</tr><tr>...</tr>');
          $('#entri-p > tbody:last-child').append('<tr>...</tr><tr>...</tr>');
      </script>
      </div>
    );
  }
}

export default Entri_p;
