import React, { Component } from 'react';
// table stuff
import $ from 'jquery';

// ----ALMANAC FUNCTION
function set_settings(_url) {

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": _url,
      "method": "GET",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "a7fad470-f7a5-ec21-2aa5-4bd2f532cd6b"
      }
    }

    return settings;
}

// ----MAIN APP
class Dsrt extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#dsrt-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#dsrt-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

          });

          // get data: Kecamatan
          $.ajax(set_settings("http://localhost:8002/master-kec")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#dsrt-kec").append(
                  "<option value="+data[i]['kode_kec']+">["+data[i]['kode_kec']+"] "+data[i]['nama_kec']+"</option>"
                  );
                }

          });

          // get data: desa
          $.ajax(set_settings("http://localhost:8002/master-desa")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#dsrt-desa").append(
                  "<option value="+data[i]['kode_desa']+">["+data[i]['kode_desa']+"] "+data[i]['nama_desa']+"</option>"
                  );
                }

          });

          // get data: nbs/nks
          $.ajax(set_settings("http://localhost:8002/master-nks")).done(function (_data) {
              var data = _data;
              // console.log(JSON.stringify(data)); //debug

                for (var i=0; i<data.length; i++) {
                	$("#dsrt-nbsnks").append(
                  "<option value="+data[i]['nbs']+" / "+data[i]['nks']+">"+data[i]['nbs']+" / "+data[i]['nks']+"</option>"
                  );
                }

          });

      });


  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    var dsrt_sem = $('#dsrt-sem option:selected').val();
    var dsrt_prov = $('#dsrt-prov option:selected').val();
    var dsrt_kab = $('#dsrt-kab option:selected').val();
    var dsrt_kec = $('#dsrt-kec option:selected').val();
    var dsrt_desa = $('#dsrt-desa option:selected').val();
    //var dsrt_nbsnks = $('#dsrt-nbsnks option:selected').val();

    // remove rows
    $("#dsrt > tbody > tr").remove();

    var temp = {
      dsrt_sem:dsrt_sem,
      dsrt_prov:dsrt_prov,
      dsrt_kab:dsrt_kab,
      dsrt_kec:dsrt_kec,
      dsrt_desa:dsrt_desa,
      //dsrt_nbsnks:dsrt_nbsnks
    };

    $.get("http://localhost:8002/dsrt",
        temp,
        function(data, status) {
            // alert(JSON.stringify(temp)); //debug
            // alert(JSON.stringify(data)); //debug


            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#dsrt > tbody").append(
                  "<tr class='form-data' onclick=\"document.location = 'form-dsrt.html';\">"+
                    "<td>"+
                    data[i]['no_dsrt'] + "</td><td>" +
                    data[i]['nama_krt'] + "</td><td>" +
                    data[i]['alamat'] + "</td><td>" +
                    data[i]['NURT'] + "</td>" +
                  "</tr>");
                  }
            else
                $("#dsrt > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

  }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4" >
        <label for="dsrt-sem">Semester:</label>
        <select class="form-control" id="dsrt-sem" >
          <option>1</option>
          <option>2</option>
        </select>

        <label for="dsrt-prov">Provinsi:</label>
        <select class="form-control" id="dsrt-prov">
        </select>

        <label for="dsrt-kab">Kabupaten:</label>
        <select class="form-control" id="dsrt-kab">
        </select>

        <label for="dsrt-kec">Kecamatan:</label>
        <select class="form-control" id="dsrt-kec">
        </select>

        <label for="dsrt-desa">Desa:</label>
        <select class="form-control" id="dsrt-desa">
        </select>

        <label for="dsrt-nbsnks">Nbs/Nks:</label>
        <select class="form-control" id="dsrt-nbsnks">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <table id="dsrt" class="table table-striped table table-bordered table-hover">
        <thead>
          <tr>
            <th>No Dsrt</th>
            <th>Nama KRT</th>
            <th>Alamat</th>
            <th>ART</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>SAMSUL BAHRI</td>
              <td>DUSUN MELATI</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2</td>
              <td>FADLI ISMAIL</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            </tr>
            <tr>
              <td>3</td>
              <td>SAMSURI</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            </tr>
            <tr>
              <td>4</td>
              <td>BURHANUDDIN</td>
              <td>DUSUN MAWAR</td>
              <td>3</td>
            </tr>
            <tr>
              <td>5</td>
              <td>DIDI ARIANTO</td>
              <td>DUSUN MELATI</td>
              <td>2</td>
            </tr>
        </tbody>
      </table>

      </div>
    );
  }
}

export default Dsrt;
