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
class Ruta extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#ruta-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#ruta-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

          });

          // get data: Kecamatan
          $.ajax(set_settings("http://localhost:8002/master-kec")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#ruta-kec").append(
                  "<option value="+data[i]['kode_kec']+">["+data[i]['kode_kec']+"] "+data[i]['nama_kec']+"</option>"
                  );
                }

          });

          // get data: desa
          $.ajax(set_settings("http://localhost:8002/master-desa")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#ruta-desa").append(
                  "<option value="+data[i]['kode_desa']+">["+data[i]['kode_desa']+"] "+data[i]['nama_desa']+"</option>"
                  );
                }

          });

          // get data: nbs/nks
          $.ajax(set_settings("http://localhost:8002/master-nks")).done(function (_data) {
              var data = _data;
              // console.log(JSON.stringify(data)); //debug

              for (var i=0; i<data.length; i++) {
                $("#ruta-nbsnks").append(
                "<option value="+data[i]['nbs']+" / "+data[i]['nks']+">"+data[i]['nbs']+" / "+data[i]['nks']+"</option>"
                );
              }

          });

      });


  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    var ruta_sem = $('#ruta-sem option:selected').val();
    var ruta_prov = $('#ruta-prov option:selected').val();
    var ruta_kab = $('#ruta-kab option:selected').val();
    var ruta_kec = $('#ruta-kec option:selected').val();
    var ruta_desa = $('#ruta-desa option:selected').val();
    //var dsrt_nbsnks = $('#dsrt-nbsnks option:selected').val();
    var ruta_no_dsrt;

    $.get("http://localhost:8002/dsrt",
        {
          ruta_sem:ruta_sem,
          ruta_prov:ruta_prov,
          ruta_kab:ruta_kab,
          ruta_kec:ruta_kec,
          ruta_desa:ruta_desa,
          //dsrt_nbsnks:dsrt_nbsnks
        },
        function(data, status) {
            // alert(JSON.stringify(data)); //debug

            // remove rows
            $("#ruta > tbody > tr").remove();

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  var temp =
                  "<tr class='form-data'>"+
                    "<td>"+
                    data[i]['no_dsrt'] + "</td><td>" +
                    data[i]['nama_krt'] + "</td><td>" +
                    data[i]['alamat'] + "</td><td>" +
                    data[i]['NURT'] + "</td><td>";

                    // get status_dok
                    $.get("http://localhost:8002/data_rt",
                      {
                        ruta_sem:ruta_sem,
                        ruta_prov:ruta_prov,
                        ruta_kab:ruta_kab,
                        ruta_dsrt:data[i]['no_dsrt']
                      },
                      function(data_dok, status) {
                        temp += data_dok[0]['no_dsrt'] +  "</td></tr>";
                      });

                  $("#ruta > tbody").append(temp);
                }
            else
                $("#ruta > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

  }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4" >
        <label for="ruta-sem">Semester:</label>
        <select class="form-control" id="ruta-sem" >
          <option>1</option>
          <option>2</option>
        </select>

        <label for="ruta-prov">Provinsi:</label>
        <select class="form-control" id="ruta-prov">
        </select>

        <label for="ruta-kab">Kabupaten:</label>
        <select class="form-control" id="ruta-kab">
        </select>

        <label for="ruta-kec">Kecamatan:</label>
        <select class="form-control" id="ruta-kec">
        </select>

        <label for="ruta-desa">Desa:</label>
        <select class="form-control" id="ruta-desa">
        </select>

        <label for="ruta-nbsnks">Nbs/Nks:</label>
        <select class="form-control" id="ruta-nbsnks">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <table id="ruta" class="table table-striped table table-bordered table-hover">
        <thead>
          <tr>
            <th>No DSRT</th>
            <th>Nama KRT</th>
            <th>Alamat</th>
            <th>ART</th>
            <th>Status Dok</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td colSpan='6'>Tekan Refresh</td>
            </tr>
            <tr>
              <td>1</td>
              <td>SAMSUL BAHRI</td>
              <td>DUSUN MELATI</td>
              <td>3</td>
            <td>C</td></tr>
            <tr>
              <td>2</td>
              <td>FADLI ISMAIL</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            <td>C</td></tr>
            <tr>
              <td>3</td>
              <td>SAMSURI</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            <td>C</td></tr>
            <tr>
              <td>4</td>
              <td>BURHANUDDIN</td>
              <td>DUSUN MAWAR</td>
              <td>3</td>
            <td>C</td></tr>
            <tr>
              <td>5</td>
              <td>DIDI ARIANTO</td>
              <td>DUSUN MELATI</td>
              <td>2</td>
            <td>C</td></tr>
        </tbody>
      </table>

      </div>
    );
  }
}

export default Ruta;
