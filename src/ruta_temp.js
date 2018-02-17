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
        <label for="dsrt-sem">Semester:</label>
        <select class="form-control" id="dsrt-sem" name="dsrt-sem" onChange={this.changeHandlerSem.bind(this)} value={this.state.dsrt_sem_val} >
          <option>1</option>
          <option>2</option>
        </select>

        <label for="dsrt-prov">Provinsi:</label>
        <select class="form-control" id="dsrt-prov" name="dsrt-prov" onChange={this.changeHandlerProv.bind(this)} value={this.state.dsrt_prov_val}>
        </select>

        <label for="dsrt-kab">Kabupaten:</label>
        <select class="form-control" id="dsrt-kab" name="dsrt-kab" onChange={this.changeHandlerKab.bind(this)} value={this.state.dsrt_kab_val}>
        </select>

        <label for="dsrt-kec">Kecamatan:</label>
        <select class="form-control" id="dsrt-kec" name="dsrt-kec" onChange={this.changeHandlerKec.bind(this)} value={this.state.dsrt_kec_val}>
        </select>

        <label for="dsrt-desa">Desa:</label>
        <select class="form-control" id="dsrt-desa" name="dsrt-desa" onChange={this.changeHandlerDesa.bind(this)} value={this.state.dsrt_desa_val}>
        </select>

        <label for="dsrt-nks">Nbs / Nks:</label>
        <select class="form-control" id="dsrt-nks" name="dsrt-nks" onChange={this.changeHandlerNks.bind(this)} value={this.state.dsrt_nks_val}>
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
            <tr data-toggle='modal' data-target='#form'>
              <td>1</td>
              <td>SAMSUL BAHRI</td>
              <td>DUSUN MELATI</td>
              <td>3</td>
            </tr>
            <tr data-toggle='modal' data-target='#form'>
              <td>2</td>
              <td>FADLI ISMAIL</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            </tr>
            <tr data-toggle='modal' data-target='#form'>
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
            <tr data-toggle='modal' data-target='#form'>
              <td>5</td>
              <td>DIDI ARIANTO</td>
              <td>DUSUN MELATI</td>
              <td>2</td>
            </tr>
        </tbody>
      </table>

      {/* MODAL */}
      <div id="form" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Form Entri Pemutakhiran</h4>
            </div>

            <div class="modal-body">

            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#hal1">Halaman 1</a></li>
              <li><a data-toggle="tab" href="#hal2">Halaman 2</a></li>
            </ul>

            <div class="tab-content">

            <div id="hal1" class="tab-pane fade in active">

            {/* MODAL-FORM */}
            <div id="form-dsrt">
            <table class="table table-striped table table-bordered table-hover">
              <thead>
                <tr>
                  <th colSpan="3">I. Pengenalan Tempat</th>
                </tr>
              </thead>
              <tbody>
            <tr>
              <th>1.</th>
                <td>PROVINSI</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>2.</th>
                <td>KABUPATEN/KOTA *)</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>3.</th>
                <td>KECAMATAN</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>4.</th>
                <td>DESA/KELURAHAN *)</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
                <th>5.</th>
                  <td>KLASIFIKASI DESA/KELUARAHAN</td>
                  <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>6.</th>
                <td>NOMOR BLOK SENSUS</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>7.</th>
                <td>NOMOR KODE SAMPEL</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>8.</th>
                <td>NOMOR URUT RUMAH TANGGA SAMPEL SAK17.DSRT BLOK III KOLOM (1)</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>9.</th>
                <td>NAMA KEPALA RUMAH TANGGA</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>10.</th>
                <td>NAMA DAN NOMOR URUT PEMBERI INFORMASI UTAMA</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            <tr>
              <th>11.</th>
                <td>HASIL KUNJUNGAN</td>
                <td><input type="text" class="form-control" id="usr" /></td>
            </tr>
            </tbody>
            </table>

            <table class="table table-striped table table-bordered table-hover">
              <thead>
                <tr>
                  <th colSpan="3">II. RINGKASAN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1.</th>
                    <td>JUMLAH ANGGOTA RUMAH TANGGA</td>
                    <td><input type="text" class="form-control" id="usr" /></td>
                </tr>
                <tr>
                  <th>2.</th>
                    <td>JUMLAH ANGGOTA RUMAH TANGGA YANG BERUMUR 5 TAHUN KEATAS</td>
                    <td><input type="text" class="form-control" id="usr" /></td>
                </tr>
            </tbody>
            </table>

            <table class="table table-striped table table-bordered table-hover">
              <thead>
                <tr>
                  <th colSpan="5">III. KETERANGAN PETUGAS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1.</th>
                    <td>NAMA PENCACAH<input type="text" class="form-control" id="usr" /></td>
                    <td>KODE PENCACAH<input type="text" class="form-control" id="usr" /></td>
                    <td>NOMOR HP PENCACAH<input type="text" class="form-control" id="usr" /></td>
                    <td>TANGGAL PENCACAHAN<input type="text" class="form-control" id="usr" /></td>
                </tr><tr>
                  <th>2.</th>
                    <td>NAMA PENGAWAS<input type="text" class="form-control" id="usr" /></td>
                    <td>KODE PENGAWAS<input type="text" class="form-control" id="usr" /></td>
                    <td>NOMOR HP PENGAWAS<input type="text" class="form-control" id="usr" /></td>
                    <td>TANGGAL PENGAWASAN<input type="text" class="form-control" id="usr" /></td>
                </tr>
            </tbody>
            </table>

              </div>
            </div>

            <div id="hal2" class="tab-pane fade">
            <div id="form-dsrt-4">
              <h3>Pemutakhiran Rumah Tangga</h3>
              <table id="form-dsrt-b5" class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>id_art</th>
                          <th>Nama Anggota Rumah Tangga</th>
                          <th>Hubungan dengan KRT</th>
                          <th>Jenis Kelamin</th>
                          <th>Bulan Lahir</th>
                          <th>Tanggal Lahir</th>
                          <th>Umur</th>
                          <th>Partisipasi Sekolah</th>
                          <th>Status Perkawinan</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td><input id="dsrt-form-rt-id_art" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k2" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k3" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k4" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k5_bl" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k5_th" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k6" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k7" type="text" value="" /></td>
                          <td><input id="dsrt-form-rt-b4_k8" type="text" value="" /></td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-warning" id="add-btn-add" onClick={this.add}>Add</button>
              <button type="button" class="btn btn-warning" id="add-btn-save" onClick={this.save} data-dismiss="modal">Save</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          {/* MODAL_END */}

      </div>
      </div>
      </div>

      </div>
    );
  }
}

export default Ruta;
