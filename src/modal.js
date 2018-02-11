import React, { Component } from 'react';
import './css/modal.css';
// table stuff
import $ from 'jquery';


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

            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#hal1">Halaman 1</a></li>
              <li><a data-toggle="tab" href="#hal2">Halaman 2</a></li>
            </ul>

            <div class="tab-content">
            <div id="hal1" class="tab-pane fade in active">
                <table class="table table-striped table-bordered">
                <h3>Form Entri Pemutakhiran Data Ruta</h3>
                    <tbody>
                        <tr>
                            <td>Semester: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>Provinsi: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>Kab/Kota: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>Kecamatan: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>Desa: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>SLS: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>NKS: </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>Jumlah RT hasil pemutakhiran: </td>
                            <td>
                                <input type="text" value="" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Uraian</th>
                          <th>Pencacah</th>
                          <th>Pengawas</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                            <td>Nama Petugas</td>
                            <td>
                                <input id="entri-p-form-b3_r1a" type="text" value="" />
                            </td>
                            <td>
                                <input id="entri-p-form-b3_r1b" type="text" value="" />
                            </td>
                        </tr>
                        <tr>
                            <td>Tanggal</td>
                            <td>
                                <input id="entri-p-form-b3_r2a" type="date" value="" />
                            </td>
                            <td>
                                <input id="entri-p-form-b3_r2b" type="date" value="" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-striped table-bordered">
                  <thead>
                      <tr>
                          <th>Catatan</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                            <td>
                                <textarea id="entri-p-form-b4_rcat" type="text" value=""></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                </div>
                <div id="hal2" class="tab-pane fade">
                  <h3>Pemutakhiran Rumah Tangga</h3>
                  <table id="b5" class="table table-striped table-bordered">
                      <thead>
                          <tr>
                              <th>sls</th>
                              <th>nbf</th>
                              <th>nbs</th>
                              <th>nort</th>
                              <th>nama_krt</th>
                              <th>alamat</th>
                              <th>keberadaan_rt</th>
                              <th>nurt</th>
                              <th>jml_art</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><input id="" type="text" value="sls" /></td>
                              <td><input id="" type="text" value="nbf" /></td>
                              <td><input id="" type="text" value="nbs" /></td>
                              <td><input id="" type="text" value="nort" /></td>
                              <td><input id="" type="text" value="nama_krt" /></td>
                              <td><input id="" type="text" value="alamat" /></td>
                              <td><input id="" type="text" value="keberadaan_rt" /></td>
                              <td><input id="" type="text" value="nurt" /></td>
                              <td><input id="" type="text" value="jml_art" /></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>

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

export default Modal;
