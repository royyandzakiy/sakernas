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
class Revalidasi extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#revalidasi-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#revalidasi-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

          });

          $('#revalidasi').on('click', '.clickable-row', function(event) {
          $(this).addClass('active').siblings().removeClass('active');
        });

      });


  }

  // function: add
  add(e) {
    e.preventDefault();

    var add_petugas_sem = $('#revalidasi-sem option:selected').val();
    var add_petugas_prov = $('#revalidasi-prov option:selected').val();
    var add_petugas_kab = $('#revalidasi-kab option:selected').val();

    $(document).ready(function(){
        $('#add-sem').val(add_petugas_sem);
        $('#add-prov').val(add_petugas_prov);
        $('#add-kab').val(add_petugas_kab);
    });
  }

  // function: save
  save(e) {
    e.preventDefault();

    var add_petugas_sem = $('#add-sem').val();
    var add_petugas_prov = $('#add-prov').val();
    var add_petugas_kab = $('#add-kab').val();
    var add_petugas_kodepetugas = $('#add-kode-petugas').val();$('#add-kode-petugas').val("");
    var add_petugas_namapetugas = $('#add-nama-petugas').val();$('#add-nama-petugas').val("");
    var add_petugas_status = $('#add-status').val();$('#add-status').val("");
    var add_petugas_telp = $('#add-telp').val();$('#add-telp').val("");

    var temp = {
      add_petugas_sem:add_petugas_sem,
      add_petugas_prov:add_petugas_prov,
      add_petugas_kab:add_petugas_kab,
      add_petugas_kodepetugas:add_petugas_kodepetugas,
      add_petugas_namapetugas:add_petugas_namapetugas,
      add_petugas_status:add_petugas_status,
      add_petugas_telp:add_petugas_telp
    };

    $.post("http://localhost:8002/revalidasi/add",
        temp,
        function(data, status) {
            //alert("save status: "+status+": "+JSON.stringify(data)); //debug
            // add rows
        }).done(function() {
            //alert('insert success!');
            this.refresh;
        });
        //*/
  }

  // function: edit
  edit(e) {
    e.preventDefault();

  }
  // function: delete
  delete(e) {
    e.preventDefault();

  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    $("#revalidasi > tbody > tr").remove();

    var temp = {
      petugas_lap_sem:$('#revalidasi-sem option:selected').val(),
      petugas_lap_prov:$('#revalidasi-prov option:selected').val(),
      petugas_lap_kab:$('#revalidasi-kab option:selected').val()
    };

    // alert(JSON.stringify(temp)); //debug
    // remove rows
    $("#revalidasi > tbody > tr").remove();

    $.get("http://localhost:8002/revalidasi",
        temp,
        function(data, status) {
            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#revalidasi > tbody").append(
                  "<tr class='form-data clickable-row'>"+
                    "<td>"+
                    data[i]['kode_petugas'] + "</td><td>" +
                    data[i]['nama'] + "</td><td>" +
                    data[i]['no_telp'] + "</td><td>" +
                    data[i]['jabatan_petugas'] + "</td>" +
                  "</tr>");

                  $(".edit").css("display","none");
                  }
            else
                $("#revalidasi > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

  }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4" >
        <label for="revalidasi-sem">Semester:</label>
        <select class="form-control" id="revalidasi-sem" >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <label for="revalidasi-prov">Provinsi:</label>
        <select class="form-control" id="revalidasi-prov">
        </select>

        <label for="revalidasi-kab">Kabupaten:</label>
        <select class="form-control" id="revalidasi-kab">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <table id="revalidasi" class="table table-bordered table-hover" >
          <thead>
              <tr>
                  <th colSpan='1'>No.</th>
                  <th colSpan='4'>Nama KRT</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='5'>Tekan Refresh</td>
            </tr>
          </tbody>
      </table>

      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.add}>Start Revalidasi</button>
      <button type="button" class="btn btn-default" onClick={this.edit}>Save</button>

      </div>
    );
  }
}

export default Revalidasi;
