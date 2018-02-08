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

          $('#petugas-lap').on('click', '.clickable-row', function(event) {
          $(this).addClass('active').siblings().removeClass('active');
        });

      });


  }

  // function: add
  add(e) {
    e.preventDefault();

    var add_petugas_sem = $('#petugas-lap-sem option:selected').val();
    var add_petugas_prov = $('#petugas-lap-prov option:selected').val();
    var add_petugas_kab = $('#petugas-lap-kab option:selected').val();

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

    $.post("http://localhost:8002/petugas-lap/add",
        temp,
        function(data, status) {
            alert("save status: "+status+": "+JSON.stringify(data)); //debug
            // add rows
        }).done(function() {
            alert('insert success!');
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

    var temp = {
      petugas_lap_sem:$('#petugas-lap-sem option:selected').val(),
      petugas_lap_prov:$('#petugas-lap-prov option:selected').val(),
      petugas_lap_kab:$('#petugas-lap-kab option:selected').val()
    };

    alert(JSON.stringify(temp)); //debug
    $("#petugas-lap > tbody > tr").remove();

    $.get("http://localhost:8002/petugas-lap",
        temp,
        function(data, status) {
            // remove rows

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#petugas-lap > tbody").append(
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
          <option value="1">1</option>
          <option value="2">2</option>
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

      <table id="petugas-lap" class="table table-bordered table-hover" >
          <thead>
              <tr>
                  <th>Kode Pengawas</th>
                  <th>Nama Pengawas</th>
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

      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.add}>Add</button>
      <button type="button" class="btn btn-default" onClick={this.edit}>Edit</button>
      <button type="button" class="btn btn-default" onClick={this.delete}>Delete</button>

      <div id="add" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add Pengawas</h4>
            </div>
            <div class="modal-body">

            <table class="table-condensed">
              <tbody>
                <tr>
                  <th>Semester :</th>
                    <td><input type="text" class="form-control" id="add-sem" disabled /></td>
                </tr>
                <tr>
                  <th>Provinsi :</th>
                    <td><input type="text" class="form-control" id="add-prov" disabled /></td>
                </tr>
                <tr>
                  <th>Kabupaten :</th>
                    <td><input type="text" class="form-control" id="add-kab" disabled /></td>
                </tr>
                <tr>
                  <th>Kode Petugas :</th>
                    <td><input type="text" class="form-control" id="add-kode-petugas" /></td>
                </tr>
                <tr>
                  <th>Nama Petugas :</th>
                    <td><input type="text" class="form-control" id="add-nama-petugas" /></td>
                </tr>
                <tr>
                  <th>Deskripsi Status :</th>
                    <td><input type="text" class="form-control" id="add-status" /></td>
                </tr>
                <tr>
                  <th>No Telp :</th>
                    <td><input type="text" class="form-control" id="add-telp" /></td>
                </tr>
            </tbody>
            </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal" id="add-btn-save" onClick={this.save}>Save</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>

      </div>
    );
  }
}

export default Petugas_lap;
