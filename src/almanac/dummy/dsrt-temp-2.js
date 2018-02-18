import React, { Component } from 'react';
import './css/modal.css';
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
      this.state = {
        dsrt_sem_val:'',
        dsrt_prov_val:'',
        dsrt_kab_val:'',
        dsrt_kec_val:'',
        dsrt_desa_val:'',
        dsrt_sls_val:'',
        dsrt_nks_val:'',
        dsrt_nbs_val:'',
        dsrt_sem_list:'',
        dsrt_prov_list:'',
        dsrt_kab_list:'',
        dsrt_kec_list:'',
        dsrt_desa_list:'',
        dsrt_sls_list:'',
        dsrt_nks_list:''
      }

      this.changeHandlerSem = this.changeHandlerSem.bind(this);
      this.changeHandlerProv = this.changeHandlerProv.bind(this);
      this.changeHandlerKab = this.changeHandlerKab.bind(this);
      this.changeHandlerKec = this.changeHandlerKec.bind(this);
      this.changeHandlerDesa = this.changeHandlerDesa.bind(this);
      this.changeHandlerNks = this.changeHandlerNks.bind(this);
      this.refresh = this.refresh.bind(this);
    }

  componentDidMount() {

      $(document).ready(function(){
          // get data: provinsi
          this.setState({
            dsrt_sem_val: '1'
          });

          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {

                for (var i=0; i<_data.length; i++) {
                	$("#dsrt-prov").append(
                  "<option " +
                  "value='"+_data[i]['kode_prov']+"'>["+_data[i]['kode_prov']+"] "+_data[i]['nama_prov']+"</option>"
                  );
                }

                this.setState({
                  dsrt_prov_list: _data,
                  dsrt_prov_val:_data[0]['kode_prov']
                });
          }.bind(this));

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
                var data = _data;
                var first = data.length -1;
                for (var i=0; i<_data.length; i++) {
                  if(_data[i]['kode_prov']==this.state.dsrt_prov_val) {
                      first = (i < first ? i : first);
                    	$("#dsrt-kab").append(
                        "<option "+
                        "value='"+_data[i]['kode_kab']+"'>["+_data[i]['kode_kab']+"] "+_data[i]['nama_kab']+"</option>"
                      );
                    }
                }

                $("#dsrt-kab").val(_data[first]['kode_kab']);

                this.setState({
                  dsrt_kab_list: _data,
                  dsrt_kab_val:$("#dsrt-kab").val()
                });
          }.bind(this));

          // get data: Kecamatan
          $.ajax(set_settings("http://localhost:8002/master-kec")).done(function (_data) {
              var data = _data;
              var first = data.length -1;

                for (var i=0; i<data.length; i++) {
                  if(_data[i]['kode_kab']==this.state.dsrt_kab_val) {
                    first = (i < first ? i : first);
                	$("#dsrt-kec").append(
                  "<option " +
                  "value='"+data[i]['kode_kec']+"'>["+data[i]['kode_kec']+"] "+data[i]['nama_kec']+"</option>"
                  );
                }
                }

                $("#dsrt-kec").val(_data[first]['kode_kec']);

                this.setState({
                  dsrt_kec_list: _data,
                  dsrt_kec_val:$("#dsrt-kec").val()
                });
          }.bind(this));

          // get data: desa
          $.ajax(set_settings("http://localhost:8002/master-desa")).done(function (_data) {
              var data = _data;
              var first = data.length -1;

                for (var i=0; i<data.length; i++) {
                  if(data[i]['kode_kec']==this.state.dsrt_kec_val) {
                  first = (i < first ? i : first);
                	$("#dsrt-desa").append(
                  "<option " +
                  "value='"+data[i]['kode_desa']+"'>["+data[i]['kode_desa']+"] "+data[i]['nama_desa']+"</option>"
                  );
                }
                }

                // alert(JSON.stringify(data));
                // alert(first);

                $("#dsrt-desa").val(data[first]['kode_desa']);

                this.setState({
                  dsrt_desa_list: data,
                  dsrt_desa_val:$("#dsrt-desa").val()
                });
          }.bind(this));

          // get data: nbs/nks
          $.ajax(set_settings("http://localhost:8002/master-nks")).done(function (_data) {
              var data = _data;

                var first = data.length -1;

                for (var i=0; i<data.length; i++) {
                  if(_data[i]['kode_desa']==this.state.dsrt_desa_val) {
                    first = (i < first ? i : first);
                	$("#dsrt-nks").append(
                  "<option " +
                  "value='"+data[i]['nbs']+"."+data[i]['nks']+"'>"+data[i]['nks']+" / "+data[i]['nks']+"</option>"
                  );
                }
                }

                $("#dsrt-nks").val(_data[first]['nbs']+"."+_data[first]['nks']);

                this.setState({
                  dsrt_nks_list: _data,
                  dsrt_nbs_val:$("#dsrt-nks").val().substring(0,4),
                  dsrt_nks_val:$("#dsrt-nks").val().substring(5,10),
                },()=>{
                  // alert(this.state.dsrt_nks_val)
                });
          }.bind(this));

      }.bind(this));

      this.addRowHandlers();
  }

  add(e) {
    e.preventDefault();

    $("#form-dsrt-b5 > tbody").append(
      "<tr>"+
          "<td><input type='hidden' value='new' /><input id='dsrt-form-rt-id_art' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k2' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k3' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k4' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k5_bl' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k5_th' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k6' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k7' type='text' value='' /></td>"+
          "<td><input id='dsrt-form-rt-b4_k8' type='text' value='' /></td>"+
      "</tr>"
    );
  }

  addRowHandlers() {
    var table = document.getElementById("dsrt");
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler =
        function(row)
        {
          return function() {
            // SAMPLE CODE
            /*
            var cell = row.getElementsByTagName("td")[0];
            var id = cell.innerHTML;
            alert("id:" + id);//*/

            // get ROW CELLS DATA
            // put in MODAL
         };
      };
    currentRow.onclick = createClickHandler(currentRow);
    }
}

  checkEmpty() {
    var arr = [$('#dsrt-sem option:selected').val(),
      $('#dsrt-prov option:selected').val(),
      $('#dsrt-kab option:selected').val(),
      $('#dsrt-kec option:selected').val(),
      $('#dsrt-desa option:selected').val(),
      $('#dsrt-nks option:selected').val()
    ]
    for (var i=0; i<arr.length; i++)
      if(typeof arr[i] == 'undefined'){
        alert("kosong: "+i);
        return true;}
    return false;
  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    if(!this.checkEmpty()) {
    var dsrt_sem = this.state.dsrt_sem_val;
    var dsrt_prov = this.state.dsrt_prov_val;
    var dsrt_kab = this.state.dsrt_kab_val;
    var dsrt_kec = this.state.dsrt_kec_val;
    var dsrt_desa = this.state.dsrt_desa_val;
    var dsrt_nks = this.state.dsrt_nks_val;
    var dsrt_nbs = this.state.dsrt_nbs_val;

    // remove rows
    $("#dsrt > tbody > tr").remove();

    var query = {
      dsrt_sem:dsrt_sem,
      dsrt_prov:dsrt_prov,
      dsrt_kab:dsrt_kab,
      dsrt_kec:dsrt_kec,
      dsrt_desa:dsrt_desa,
      dsrt_nks:dsrt_nks,
      dsrt_nbs:dsrt_nbs
    };

    // alert(JSON.stringify(query));

    $.get("http://localhost:8002/dsrt",
        query,
        function(data, status) {
            // alert(JSON.stringify(temp)); //debug
            // alert(JSON.stringify(data)); //debug
            $("#dsrt > tbody > tr").remove();
            $("#form-entri-b5 > tbody > tr").remove(); // remove rows

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#dsrt > tbody").append(
                  // "<tr class='form-data' data-toggle='modal' data-target='#form'>"+
                  "<tr class='form-data'>"+
                      "<td>"+
                      data[i]['no_dsrt'] + "</td><td>" +
                      data[i]['nama_krt'] + "</td><td>" +
                      data[i]['alamat'] + "</td><td>" +
                      data[i]['NURT'] + "</td>" +
                  "</tr>");

                  $("#form-entri-b5 > tbody").append(
                  "<tr id='"+data[i]['_id']+"'>"+
                      "<td>"+
                      "<input type='hidden' value='"+data[i]['_id']+"' />"+
                      "<input type='text' value='"+data[i]['sls']+"' class='dsrt-form-rt-sls'/></td><td>"+
                      "<input type='text' class='dsrt-form-rt-nbf'value='"+data[i]['nbf']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-nbs' type='text' value='"+data[i]['nks']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-nort' type='text' value='"+data[i]['nort']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-nama_krt' type='text' value='"+data[i]['nama_krt']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-alamat' type='text' value='"+data[i]['alamat']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-keberadaan_rt' type='text' value='"+data[i]['keberadaan_rt']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-nurt' type='text' value='"+data[i]['nurt']+"' /></td><td>"+
                      "<input class='dsrt-form-rt-jml_art' type='text' value='"+data[i]['jml_art']+"' /></td>"+
                  '</tr>');
                  }
            else
                $("#dsrt > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");

                // generate-clickHandler
                var dsrt = document.getElementById('dsrt'),rIndex; // dsrt di ekstrak & jadi listener
                var dsrtRows = $('#dsrt tr');
                var form_dsrt_p1 = document.getElementById('form-dsrt-1'),rIndex; // FORM diubah

                var _sem = this.state.dsrt_sem_val;
                var _kode_prov = this.state.dsrt_prov_val;
                var _kode_kab = this.state.dsrt_kab_val;
                var _kode_kec = this.state.dsrt_kec_val;
                var _kode_desa = this.state.dsrt_desa_val;
                var _nks = this.state.dsrt_nks_val;
                var _nbs = this.state.dsrt_nbs_val;
                var _sls = 'this.state.dsrt.sls';
                this.addRowHandlers();
        }.bind(this));

      } else
        alert('Masih ada pilihan yang kosong');

  }

  changeHandlerSem(childComponent) {
    this.setState({
      dsrt_sem_val: childComponent.target.value
    },()=>{
      // alert(this.state.dsrt_sem_val);
    });
  }

  changeHandlerProv(childComponent) {
    // var temp = $('#dsrt-prov option:selected').text().substring(1,3);
    if (typeof childComponent == 'string')
      var temp = childComponent;
    else
      var temp = childComponent.target.value;
    this.setState({
      dsrt_prov_val:temp,
      dsrt_kab_val:'01',
    }, () => {
      // alert(this.state.dsrt_prov_val);
    $("#dsrt-kab > option").remove();
    $("#dsrt-kec > option").remove();
    $("#dsrt-desa > option").remove();
    $("#dsrt-nks > option").remove();
    $("#dsrt-nbs > option").remove();
    var data = this.state.dsrt_kab_list;
    // // rubah pilihan pada dropdown list kabupaten
    for (var i=0; i<data.length; i++)
      if(data[i]['kode_prov'] == this.state.dsrt_prov_val) {
          $("#dsrt-kab").append(
            "<option value='"+ data[i]['kode_kab'] +"'>["+data[i]['kode_kab'] + "] " + data[i]['nama_kab'] + "</option>"
          );
        }
    });
  }

  changeHandlerKab(childComponent) {
        // var temp = $('#entri-p-kab option:selected').text();
        if (typeof childComponent == 'string')
          var temp = childComponent;
        else
          var temp = childComponent.target.value;
        // alert(temp);
        this.setState({
              dsrt_kab_val:temp
        },()=>{
          // alert(this.state.dsrt_kab_val);
          $("#dsrt-kec > option").remove();
          $("#dsrt-desa > option").remove();
          $("#dsrt-nks > option").remove();
          $("#dsrt-nbs > option").remove();
          var data = this.state.dsrt_kec_list;
          // // rubah pilihan pada dropdown list kabupaten
          for (var i=0; i<data.length; i++)
            if(data[i]['kode_kab'] == this.state.dsrt_kab_val) {
                $("#dsrt-kec").append(
                  "<option value='"+ data[i]['kode_kec'] +"'>["+data[i]['kode_kec'] + "] " + data[i]['nama_kec'] + "</option>"
                );
              }
        });
    }

    changeHandlerKec(childComponent){
      if (typeof childComponent == 'string')
        var temp = childComponent;
      else
        var temp = childComponent.target.value;
      // alert(temp);
      this.setState({
            dsrt_kec_val:temp
      },()=>{
        // alert(this.state.dsrt_kec_val);
        $("#dsrt-desa > option").remove();
        $("#dsrt-nks > option").remove();
        $("#dsrt-nbs > option").remove();
        var data = this.state.dsrt_desa_list;
        // rubah pilihan pada dropdown list kecupaten
        for (var i=0; i<data.length; i++)
          if(data[i]['kode_kec'] == this.state.dsrt_kec_val) {
              $("#dsrt-desa").append(
                "<option value='"+ data[i]['kode_desa'] +"'>["+data[i]['kode_desa'] + "] " + data[i]['nama_desa'] + "</option>"
              );
            }
      });
    }
    changeHandlerDesa(childComponent){
      if (typeof childComponent == 'string')
        var temp = childComponent;
      else
        var temp = childComponent.target.value;
      // alert(temp);
      this.setState({
            dsrt_desa_val:temp
      },()=>{
        // alert(this.state.dsrt_desa_val);
        $("#dsrt-nks > option").remove();
        var data = this.state.dsrt_nks_list;
        // // rubah pilihan pada dropdown list desaupaten
        var first = data.length -1;

        for (var i=0; i<data.length; i++)
          if(data[i]['kode_desa'] == this.state.dsrt_desa_val) {
              first = (i < first ? i : first);
              $("#dsrt-nks").append(
                "<option value='"+ data[i]['nbs'] +"."+ data[i]['nks'] +"'>"+data[i]['nbs'] + " / "+data[i]['nks']+"</option>"
              );
            }


      $("#dsrt-nks").val(data[first]['nbs']+"."+data[first]['nks']);

      this.setState({
        dsrt_nks_list: data,
        dsrt_nbs_val:data[first]['nbs'],
        dsrt_nks_val:data[first]['nks']
      });
    });
    }
    changeHandlerNks(childComponent){
      if (typeof childComponent == 'string')
        var temp = childComponent;
      else
        var temp = childComponent.target.value;
      // alert(temp);
      this.setState({
            dsrt_nbs_val:temp.substring(0,4),
            dsrt_nks_val:temp.substring(5,10)
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

export default Dsrt;
