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

class ModalTableBottom extends Component {
  render() {
    return (
      <div class="modal-body-bottom">

      <table class="table table-hover table-bordered table-striped" id="modal-table-big">
        <thead>
          <tr>
            <th>SLS</th>
            <th>NBF</th>
            <th>NBS</th>
            <th>NURT</th>
            <th>Nama KRT</th>
            <th>Alamat</th>
            <th>Keberadaan Ruta</th>
            <th>No. Urut Pemutakhiran</th>
            <th>Jml ART</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      </div>
    )
  }
}

class ModalTableTop extends Component {
  render() {
    return (
      <div class="modal-body-top">

      <table class="table col-lg-4" id="modal-table-1">
        <tbody>
          <tr>
            <th>Semester</th>
            <td id="modal-sem"></td>
          </tr>
          <tr>
            <th>Provinsi</th>
            <td id="modal-prov"></td>
          </tr>
          <tr>
            <th>Kabupaten</th>
            <td id="modal-kab"></td>
          </tr>
          <tr>
            <th>Kecamatan</th>
            <td id="modal-kec"></td>
          </tr>
          <tr>
            <th>Desa</th>
            <td id="modal-desa"></td>
          </tr>
          <tr>
            <th>NKS</th>
            <td id="modal-nks"></td>
          </tr>
        </tbody>
      </table>

      <table class="table col-lg-4" id="modal-table-2">
        <tbody>
          <tr>
            <th rowSpan="2">Jumlah rumah tangga hasil pemutakhiran</th>
            <td>fsdfd</td>
          </tr>
          <tr>
            <th>Keterangan Pencacah</th>
            <td id="modal-b3r1a">
              Nama: <input id="modal-b3r1a" type="text" />
              Tanggal: <input id="modal-b3r2atl" type="text" />
              Bulan: <input id="modal-b3r2abl" type="text" />
              Tahun: <input id="modal-b3r2ath" type="text" />
            </td>
          </tr>
          <tr>
            <th>Keterangan Pengawas</th>
            <td id="modal-b3r1b">
              Nama Pengawas: <input id="modal-b3r1b" type="text" />
              Tanggal: <input id="modal-b3r2btl" type="text" />
              Bulan: <input id="modal-b3r2bbl" type="text" />
              Tahun: <input id="modal-b3r2bth" type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      </div>
    )
  }
}

class Modal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data_p:{},
        modal_table_1: {},
        modal_table_big: {}
      };

      this.getData();
  }

  getData() {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8002/petugas-lap/all",
      "method": "GET",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "a7fad470-f7a5-ec21-2aa5-4bd2f532cd6b"
      },
      success: function(_data) {
        this.setState({
          data_p: _data
        });
        // alert(this.state.data_p);

        this.fill();

      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    });
  }

  fill() {
    //--- ENTRI-P ONCLICK
    //    PERBARUI MODAL-TABLE
    // table reference
    var entri_p = document.getElementById('entri-p'),rIndex;
    var modal_table = document.getElementById('modal-table'),rIndex_mt;

    for (var i=0; i<entri_p.rows.length; i++) {
      entri_p.rows[i].onclick = function() {
        alert('msg3');
        alert($(this).children('td'));

        var modal_sem = document.getElementById("entri-p-sem").value;
        var modal_prov = document.getElementById("entri-p-prov").value;
        var modal_kab = document.getElementById("entri-p-kab").value;
        var modal_kec = this.cells[1].innerHTML;
        var modal_desa = this.cells[2].innerHTML;
        var modal_nks = this.cells[3].innerHTML;

        //--- rubah nilai dari modal
        document.getElementById("modal-sem").innerHTML = modal_sem;
        document.getElementById("modal-prov").innerHTML = modal_prov;
        document.getElementById("modal-kab").innerHTML = modal_kab;
        document.getElementById("modal-kec").innerHTML = modal_kec;
        document.getElementById("modal-desa").innerHTML = modal_desa;
        document.getElementById("modal-nks").innerHTML = modal_nks;

        //--- remove rows
        $("#modal-table-big > tbody > tr").remove();

        //--- GENERATE MODAL-ROWS (editable)
        alert (this.state.data_p.length);
        if (this.state.data_p.length != 0)
          for (var i=0; i<this.state.data_p.length; i++) {
              $("#modal-table-big > tbody").append(
              "<tr class='edit'>"+
                "<td>"+
                "<input type=\"text\" value="+ this.state.data_p[i]['sls'] +" />" +this.state.data_p[i]['sls']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['nbf'] +" />" +this.state.data_p[i]['nbf']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['nbs'] +" />" +this.state.data_p[i]['nbs']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['nurt'] +" />" +this.state.data_p[i]['nurt']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['nama_krt'] +" />" +this.state.data_p[i]['nama_krt']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['alamat'] +" />" +this.state.data_p[i]['alamat']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['alamat'] +" />" +this.state.data_p[i]['alamat']+ "</td><td>" +
                "<input type=\"text\" value="+ this.state.data_p[i]['jml_art'] +" />" +this.state.data_p[i]['jml_art']+ "</td>" +
              "</tr>");
              }
        else
            $("#entri-p > tbody").append(
            "<tr class='data'>"+
              "<td colspan='6'>Tidak ada data yang sesuai</td>"+
            "</tr>");

        //--- tambah 1 ROW terakhir utk Add
        $("#modal-table-big > tbody").append(
        this.add);

    }
  }
}

  default() {
    //--- ENTRI-P ONCLICK
    //    PERBARUI MODAL-TABLE
    // table reference
    var entri_p = document.getElementById('entri-p'),rIndex;
    var modal_table = document.getElementById('modal-table'),rIndex_mt;

    for (var i=0; i<entri_p.rows.length; i++) {
      entri_p.rows[i].onclick = function() {

        var modal_sem = document.getElementById("entri-p-sem").value;
        var modal_prov = document.getElementById("entri-p-prov").value;
        var modal_kab = document.getElementById("entri-p-kab").value;
        var modal_kec = this.cells[1].innerHTML;
        var modal_desa = this.cells[2].innerHTML;
        var modal_nks = this.cells[3].innerHTML;

        //--- rubah nilai dari modal
        document.getElementById("modal-sem").innerHTML = modal_sem;
        document.getElementById("modal-prov").innerHTML = modal_prov;
        document.getElementById("modal-kab").innerHTML = modal_kab;
        document.getElementById("modal-kec").innerHTML = modal_kec;
        document.getElementById("modal-desa").innerHTML = modal_desa;
        document.getElementById("modal-nks").innerHTML = modal_nks;

        //--- ambil data untuk generate TABLE
        $.get("http://localhost:8002/pemutakhiran",
            {
              entri_p_sem:modal_sem,
              entri_p_prov:modal_prov,
              entri_p_kab:modal_kab,
              entri_p_kec:modal_kec,
              entri_p_desa:modal_desa,
              entri_p_nks:modal_nks
            },
            function(data, status) {
                // alert(JSON.stringify(data)); //debug

                //--- remove rows
                $("#modal-table-big > tbody > tr").remove();

                //--- GENERATE MODAL-ROWS (editable)
                if (data.length != 0)
                  for (var i=0; i<data.length; i++) {
                      $("#modal-table-big > tbody").append(
                      "<tr class='edit'>"+
                        "<td>"+
                        "<input type=\"text\" value="+ data[i]['sls'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['nbf'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['nbs'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['nurt'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['nama_krt'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['alamat'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['alamat'] +" />" + "</td><td>" +
                        "<input type=\"text\" value="+ data[i]['jml_art'] +" />" + "</td>" +
                      "</tr>");
                      }
                else
                    $("#entri-p > tbody").append(
                    "<tr class='data'>"+
                      "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                    "</tr>");

                //--- tambah 1 ROW terakhir utk Add
                $("#modal-table-big > tbody").append(
                this.add);
            });
      }
    }
  }
  // <ModalTableTop />

  render() {
    return(
      <div id="form" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Form Entri Pemutakhiran</h4>
            </div>
            <div class="modal-body">

                <ModalTableBottom />

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" id="add-btn-add" onClick={this.add}>Add</button>
              <button type="button" class="btn btn-warning" id="add-btn-save" onClick={this.save}>Save</button>
              <button type="button" class="btn btn-warning" id="add-btn-generate" onClick={this.generate}>Generate Sample</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

// ----MAIN APP
class Entri_p extends Component {

  constructor(props) {
      super(props);
      this.state = {tes:''};

      $(document).ready(function(){
          // get data: provinsi
          $.ajax(set_settings("http://localhost:8002/master-prov")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#entri-p-prov").append(
                  "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }

          });

          // get data: kabupaten
          $.ajax(set_settings("http://localhost:8002/master-kab")).done(function (_data) {
              var data = _data;

                for (var i=0; i<data.length; i++) {
                	$("#entri-p-kab").append(
                  "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }
          });

    });
  }

  add(e) {
    var string = "<a onClick={this.delete}>X</a>"+
    "<tr class='edit' id='entri-p-add'>"+
      "<td>"+
      "<input type=\"text\" id='modal-add-sls' /></td><td>" +
      "<input type=\"text\" id='modal-add-nbf' /></td><td>" +
      "<input type=\"text\" id='modal-add-nbs' /></td><td>" +
      "<input type=\"text\" id='modal-add-nurt' /></td><td>" +
      "<input type=\"text\" id='modal-add-nama_krt' /></td><td>" +
      "<input type=\"text\" idmodal-add-alamat /></td><td>" +
      "<input type=\"text\" id='modal-add-no_urut_p' /></td><td>" +
      "<input type=\"text\" id='modal-add-jml_art' /></td>" +
    "</tr>";
    return string;
  }

  //--- function: refresh
  refresh(e) {
    e.preventDefault();

    var entri_p_sem = $('#entri-p-sem option:selected').val();
    var entri_p_prov = $('#entri-p-prov option:selected').val();
    var entri_p_kab = $('#entri-p-kab option:selected').val();

    $.get("http://localhost:8002/pemutakhiran",
        {
          entri_p_sem:entri_p_sem,
          entri_p_prov:entri_p_prov,
          entri_p_kab:entri_p_kab
        },
        function(data, status) {
            // alert(JSON.stringify(data)); //debug

            //--- PERBARUI ENTRI-P
            //--- remove rows
            $("#entri-p > tbody > tr").remove();

            //--- generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#entri-p > tbody").append(
                  "<tr class='form-data' data-toggle='modal' data-target='#form'>"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    data[i]['kode_kec'] + "</td><td>" +
                    data[i]['kode_desa'] + "</td><td>" +
                    data[i]['nks'] + "</td><td>" +
                    data[i]['sls'] + "</td><td>" +
                    data[i]['status_dok'] + "</td>" +
                  "</tr><tr class='edit'>"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    "<input type=\"text\" value="+ data[i]['kode_kec'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data[i]['kode_desa'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data[i]['nks'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data[i]['sls'] +" />" + "</td><td>" +
                    "<input type=\"text\" value="+ data[i]['status_dok'] +" />" + "</td>" +
                  "</tr>");

                  $(".edit").css("display","none");
                  }
            else
                $("#entri-p > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });
  }

  render() {
    return (
      <div id="container" class="col-lg-12">

      <div class="form-group col-lg-4" >
        <label for="entri-p-sem">Semester:</label>
        <select class="form-control" id="entri-p-sem" >
          <option>1</option>
          <option>2</option>
        </select>

        <label for="entri-p-prov">Provinsi:</label>
        <select class="form-control" id="entri-p-prov">
        </select>

        <label for="entri-p-kab">Kabupaten:</label>
        <select class="form-control" id="entri-p-kab">
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
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
            <tr>
              <td colSpan='6'>Tekan Refresh</td>
            </tr>
          </tbody>
      </table>

      <Modal />

      </div>
    );
  }
}

export default Entri_p;
