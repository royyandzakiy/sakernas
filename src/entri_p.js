import React, { Component } from 'react';
import './css/main.css';

// table stuff
import $ from 'jquery';

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

const options = {
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

// ----MAIN APP
class Entri_p extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){

          $.ajax(settings).done(function (_data_pemutakhiran) {
              data_pemutakhiran = _data_pemutakhiran;
              console.log("data_pemutakhiran: " + JSON.stringify(data_pemutakhiran));

              if (data_pemutakhiran.length == 0) {
                $("#entri-p > tbody").append("<tr>" +
                "List Empty" +
                "</tr>");
              } else {

                for (var i=0; i<data_pemutakhiran.length; i++) {
                	$("#entri-p > tbody").append(
                  "<a href='#'><tr class='data'>"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    data_pemutakhiran[i]['kode_kec'] + "</td><td>" +
                    data_pemutakhiran[i]['kode_desa'] + "</td><td>" +
                    data_pemutakhiran[i]['nks'] + "</td><td>" +
                    data_pemutakhiran[i]['sls'] + "</td><td>" +
                    data_pemutakhiran[i]['status_dok'] + "</td>" +
                  "</tr></a><tr class='edit'>"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    "<input type=\"text\" value="+ data_pemutakhiran[i]['kode_kec'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data_pemutakhiran[i]['kode_desa'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data_pemutakhiran[i]['nks'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data_pemutakhiran[i]['sls'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data_pemutakhiran[i]['status_dok'] +" />" + "</td>" +
                  "</tr>");

                  $(".edit").css("display","none");
                  }
              }
          });
      });

      }

  render() {
    return (
      <div id="container" class="col-lg-12">

      <div>
          <input >
      </div>

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
          </tbody>
      </table>
      </div>
    );
  }
}

export default Entri_p;
