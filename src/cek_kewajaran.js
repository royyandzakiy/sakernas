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
class Cek_kewajaran extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      $(document).ready(function(){
      // INIT
      // 1. get dropdown data
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#cek-kewajaran-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#cek-kewajaran-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

          });

      //2. set click listener
          $('#cek-kewajaran').on('click', '.clickable-row', function(event) { // table #cek-kewajaran
          $(this).addClass('active').siblings().removeClass('active');
        });

      });


  }

  componentDidMount() {
    // INIT table #cek-kewajaran
    $("#cek-kewajaran > tbody > tr").remove();
    for (var i=0; i<12; i++) {
      $("#cek-kewajaran > tbody").append(
      "<tr class='form-data clickable-row'>"+
        "<td>"+
        i*5+"-"+(5*(i+1)-1)+"</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td>" +
      "</tr>");

      }
      $("#cek-kewajaran > tbody").append(
        "<tr class='form-data clickable-row'>"+
        "<td>"+
        "60+</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td>" +
        "</tr>");
  }

  // function: add
  add(e) {
    e.preventDefault();

    var add_petugas_sem = $('#cek-kewajaran-sem option:selected').val();
    var add_petugas_prov = $('#cek-kewajaran-prov option:selected').val();
    var add_petugas_kab = $('#cek-kewajaran-kab option:selected').val();

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

    $.post("http://localhost:8002/cek-kewajaran/add",
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

    var temp = {
      petugas_lap_sem:$('#cek-kewajaran-sem option:selected').val(),
      petugas_lap_prov:$('#cek-kewajaran-prov option:selected').val(),
      petugas_lap_kab:$('#cek-kewajaran-kab option:selected').val()
    };

    // alert(JSON.stringify(temp)); //debug
    // remove rows
    $("#cek-kewajaran > tbody > tr").remove();

    $.get("http://localhost:8002/cek-kewajaran",
        temp,
        function(data, status) {
            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#cek-kewajaran > tbody").append(
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
                $("#cek-kewajaran > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

  }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4" >
        <label for="cek-kewajaran-sem">Semester:</label>
        <select class="form-control" id="cek-kewajaran-sem" >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <label for="cek-kewajaran-prov">Provinsi:</label>
        <select class="form-control" id="cek-kewajaran-prov">
        </select>

        <label for="cek-kewajaran-kab">Kabupaten:</label>
        <select class="form-control" id="cek-kewajaran-kab">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <table id="cek-kewajaran" class="table table-bordered table-hover" >
          <thead>
              <tr>
                  <th>Kelompok Umur (B4K6)</th>
                  <th>Laki-laki</th>
                  <th>(%) Laki-laki</th>
                  <th>Perempuan</th>
                  <th>(%) Perempuan</th>
                  <th>Total</th>
                  <th>(%) Total</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='7'>Tekan Refresh</td>
            </tr>
          </tbody>
      </table>

      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.add}>Setujui Data</button>
      <button type="button" class="btn btn-default" onClick={this.edit}>Save</button>
      <button type="button" class="btn btn-default" onClick={this.delete}>Close</button>

      </div>
    );
  }
}

export default Cek_kewajaran;
