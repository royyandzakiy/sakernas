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
        modal_table_big: {},
        refresh:false
      };

      this.getData();
      this.refreshForm = this.refreshForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  alert(JSON.stringify(nextProps));
  if (nextProps.semester !== this.state.semester) {
    this.setState({ semester: nextProps.semester });
  }
  if (nextProps.kode_prov !== this.state.kode_prov) {
    this.setState({ kode_prov: nextProps.kode_prov });
  }
  if (nextProps.kode_kab !== this.state.kode_kab) {
    this.setState({ kode_kab: nextProps.kode_kab });
  }
  if (nextProps.kode_kec !== this.state.kode_kec) {
    this.setState({ kode_kec: nextProps.kode_kec });
  }
  if (nextProps.kode_desa !== this.state.kode_desa) {
    this.setState({ kode_desa: nextProps.kode_desa });
  }
  if (nextProps.sls !== this.state.sls) {
    this.setState({ sls: nextProps.sls });
  }
  if (nextProps.nks !== this.state.nks) {
    this.setState({ nks: nextProps.nks });
  }
  if(nextProps.refresh != this.state.refresh) {
    this.refreshForm();
  }
}

  refreshForm() {
      alert('refresh!');
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

      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    });
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
            <div id="form-entri-p" class="tab-pane fade in active">
                <table class="table table-striped table-bordered" id="form-entri-p-1">
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

                <table class="table table-striped table-bordered" class="form-entri-p-2">
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

                <table class="table table-striped table-bordered" id="form-entri-p-3">
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
                <div id="hal2" class="tab-pane fade" id="form-entri-p">
                  <h3>Pemutakhiran Rumah Tangga</h3>
                  <table id="form-entri-b5" class="table table-striped table-bordered">
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
                              <td><input type="text" value="sls" id="form-entri-p-rt-sls"/></td>
                              <td><input type="text" id="form-entri-p-rt"value="nbf" /></td>
                              <td><input id="form-entri-nbs" type="text" value="nbs" /></td>
                              <td><input id="form-entri-nort" type="text" value="nort" /></td>
                              <td><input id="form-entri-nama_krt" type="text" value="nama_krt" /></td>
                              <td><input id="form-entri-alamat" type="text" value="alamat" /></td>
                              <td><input id="form-entri-keberadaan_rt" type="text" value="keberadaan_rt" /></td>
                              <td><input id="form-entri-nurt" type="text" value="nurt" /></td>
                              <td><input id="form-entri-jml_art" type="text" value="jml_art" /></td>
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
