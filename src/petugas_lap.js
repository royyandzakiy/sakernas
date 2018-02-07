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
class Petugas_lap extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#petugas-lap-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#petugas-lap-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

          });

      });


  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    var entri_p_sem = $('#petugas-lap-sem option:selected').val();
    var entri_p_prov = $('#petugas-lap-prov option:selected').val();
    var entri_p_kab = $('#petugas-lap-kab option:selected').val();

    $.get("http://localhost:8002/petugas_lap",
        {
          entri_p_sem:entri_p_sem,
          entri_p_prov:entri_p_prov,
          entri_p_kab:entri_p_kab
        },
        function(data, status) {
            // alert(JSON.stringify(data)); //debug

            // remove rows
            $("#petugas-lap > tbody > tr").remove();

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#petugas-lap > tbody").append(
                  "<tr class='form-data' onclick=\"document.location = 'form-petugas-lap.html';\">"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    data[i]['kode_petugas'] + "</td><td>" +
                    data[i]['nama'] + "</td><td>" +
                    data[i]['no_telp'] + "</td><td>" +
                    data[i]['jabatan_petugas'] + "</td>" +
                  "</tr>");

                  $(".edit").css("display","none");
                  }
            else
                $("#petugas-lap > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

  }

  render() {
    return (
      <div id="container" class="col-lg-12">

      <div class="form-group col-lg-4" >
        <label for="petugas-lap-sem">Semester:</label>
        <select class="form-control" id="petugas-lap-sem" >
          <option>1</option>
          <option>2</option>
        </select>

        <label for="petugas-lap-prov">Provinsi:</label>
        <select class="form-control" id="petugas-lap-prov">
        </select>

        <label for="petugas-lap-kab">Kabupaten:</label>
        <select class="form-control" id="petugas-lap-kab">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <table id="petugas-lap" class="table-striped table table-bordered table-hover" >
          <thead>
              <tr>
                  <th>Kode Pengawas</th>
                  <th colSpan="2">Nama Pengawas</th>
                  <th>No Telp</th>
                  <th>Status Pengawas</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='6'>Tekan Refresh</td>
            </tr>
          </tbody>
      </table>

      <button type="button" class="btn btn-default" onClick={this.refresh}>Add</button>
      <button type="button" class="btn btn-default" onClick={this.refresh}>Edit</button>
      <button type="button" class="btn btn-default" onClick={this.refresh}>Delete</button>
      </div>
    );
  }
}

export default Petugas_lap;
