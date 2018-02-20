import React, { Component } from 'react';
import './css/modal.css';
// table stuff
import $ from 'jquery';

// ----MAIN APP
class Entri_p extends Component {

  constructor(props) {
      super(props);
      this.changeHandlerProv = this.changeHandlerProv.bind(this);
      this.changeHandlerKab = this.changeHandlerKab.bind(this);
      this.changeHandlerSem = this.changeHandlerSem.bind(this);
      this.refresh = this.refresh.bind(this);
      this.add = this.add.bind(this);
      this.save = this.save.bind(this);
      // this.setupListener = this.setupListener.bind(this);
      this.state = {
        entri_p_sem_val: '1',
        entri_p_prov_list: {},
        entri_p_prov_val: '00',
        entri_p_kab_list: {},
        entri_p_kab_val: '01',
        entri_p_kec_val: '01',
        entri_p_desa_val: '01',
        entri_p_nks_val: '01',
        entri_p_sls_val: '01',
      };
  }

  add(e) {
    $("#form-entri-b5 > tbody").append(
    "<tr>"+
      "<td>"+
      "<input type='hidden' value='new' />"+
      "<input type='text' value='' class='entri-p-form-rt-sls'/></td><td>"+
      "<input type='text' class='entri-p-form-rt-nbf'value='' /></td><td>"+
      "<input class='entri-p-form-rt-nbs' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-nort' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-nama_krt' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-alamat' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-keberadaan_rt' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-nurt' type='text' value='' /></td><td>"+
      "<input class='entri-p-form-rt-jml_art' type='text' value='' /></td>"+
    '</tr>');
  }

  componentDidMount() {
        // isi list provinsi
        this.setState({
          entri_p_sem_val: '1'
        });

        $.get("http://localhost:8002/master-prov",
            {},
            function(_data, status) {

              for (var i=0; i<_data.length; i++) {
                  $("#entri-p-prov").append(
                    "<option " + (i==0 ? "selected" : "") +
                    "value="+_data[i]['kode_prov']+">["+_data[i]['kode_prov']+"] "+_data[i]['nama_prov']+"</option>"
                  );
                }

                this.setState({
                  entri_p_prov_list: _data,
                  entri_p_prov_val: _data[0]['kode_prov']
                });
            }.bind(this));
        // isi list kabupaten
        $.get("http://localhost:8002/master-kab",
            {kode_prov: this.state.entri_p_prov_val},
            function(_data, status) {
                // alert(JSON.stringify(_data)); //debug
                $("#entri-p-kab > option").remove();

                if (_data.length != 0)
                for (var i=0; i<_data.length; i++) {
                  if(_data[i]['kode_prov'] == this.state.entri_p_prov_val)
                    $("#entri-p-kab").append(
                      "<option value="+_data[i]['kode_kab']+">["+_data[i]['kode_kab']+"] "+_data[i]['nama_kab']+"</option>"
                    );
                }
                this.setState({
                  entri_p_kab_list: _data,
                  entri_p_kab_val: _data[0]['kode_kab']
                });

            }.bind(this));
  }

  save(e) {
        var form_entri_b5 = document.getElementById('form-entri-b5'),rIndex; // entri_p di ekstrak & jadi listener
        var form_entri_p_1 = document.getElementById('form-entri-p-1'),rIndex; // entri_p di ekstrak & jadi listener
        var form_entri_p_2 = document.getElementById('form-entri-p-2'),rIndex; // entri_p di ekstrak & jadi listener
        for (var i=0; i<form_entri_b5.rows.length; i++) {
          if (i > 0) {
          var _id = form_entri_b5.rows[i].cells[0].children[0].value;
          var id_user = '';
          var b3_r1a = $('#form-entri-p-2 #entri-p-form-b3_r1a').val();
          var b3_r1b = $('#form-entri-p-2 #entri-p-form-b3_r1b').val();

          var d = new Date();
          form_entri_p_2.rows[2].cells[1].children[0].value = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
          form_entri_p_2.rows[2].cells[2].children[0].value = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
          // alert(form_entri_p_2.rows[2].cells[1].children[0].value);
          // alert(form_entri_p_2.rows[2].cells[2].children[0].value);

          var status_dok = 'C'; // fungsi memeriksa status dokumen

          var temp =
              {
                "kode_prov":this.state.entri_p_prov_val,
                "kode_kab":this.state.entri_p_kab_val,
                "kode_kec":form_entri_p_1.rows[3].cells[1].innerHTML,
                "kode_desa":form_entri_p_1.rows[4].cells[1].innerHTML,
                "nks":form_entri_p_1.rows[6].cells[1].innerHTML,
                "semester":form_entri_p_1.rows[0].cells[1].innerHTML,
                "id_user":id_user,
                "status_dok":status_dok,
                "b3_r2a_tl":'',
                "b3_r2a_bl":'',
                "b3_r2a_th":'',
                "b3_r2b_tl":'',
                "b3_r2b_bl":'',
                "b3_r2b_th":'',
                "b4_rcat": $('#form-entri-p-2 #entri-p-form-b4_rcat').val(),
                "sls": form_entri_b5.rows[i].cells[0].children[1].value,
                "nbf": form_entri_b5.rows[i].cells[1].children[0].value,
                "nbs": form_entri_b5.rows[i].cells[2].children[0].value,
                "nama_krt": form_entri_b5.rows[i].cells[4].children[0].value,
                "alamat": form_entri_b5.rows[i].cells[5].children[0].value,
                "keberadaan_rt": form_entri_b5.rows[i].cells[6].children[0].value,
                "nurt": form_entri_b5.rows[i].cells[7].children[0].value,
                "jml_art": form_entri_b5.rows[i].cells[8].children[0].value,
                "nort": form_entri_b5.rows[i].cells[3].children[0].value
              }

            if (_id == 'new'){
                  $.post("http://localhost:8002/pemutakhiran/add",
                      temp,
                      function(_data, status) {
                        console.log(_data);
                      });
            } else {
              var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8002/pemutakhiran/update/"+_id,
                    "method": "PUT",
                    "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                    "postman-token": "979f6bf0-2751-c970-018d-e5b138487bec"
                    },
                    "data": temp
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
          }
        }
      }
      alert('Data diperbaharui!');
      this.refresh();
  }

  //--- function: refresh
  refresh() {
    // var entri_p_sem_val = $('#entri-p-sem option:selected').val();
    var query = {
      semester:this.state.entri_p_sem_val,
      kode_prov:this.state.entri_p_prov_val,
      kode_kab:this.state.entri_p_kab_val
    }
    // alert("query_kab: " +JSON.stringify(this.state.entri_p_kab_val));
    // alert("query: " +JSON.stringify(query));

    $.get("http://localhost:8002/pemutakhiran",
        query,
        function(data, status) {
            // alert("data : "+ JSON.stringify(data)); //debug

            //--- PERBARUI TABLE ENTRI-P & TABLE FORM-ENTRI-P
            $("#entri-p > tbody > tr").remove(); // remove rows
            $("#form-entri-b5 > tbody > tr").remove(); // remove rows

            // alert(JSON.stringify(data));

            if (data.length != 0) { // generate rows
                for (var i=0; i<data.length; i++) {
                  $("#entri-p > tbody").append(
                  "<tr class='form-data' data-toggle='modal' data-target='#form'>"+
                    "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                    data[i]['kode_kec'] + "</td><td>" +
                    data[i]['kode_desa'] + "</td><td>" +
                    data[i]['nks'] + "</td><td>" +
                    data[i]['sls'] + "</td><td>" +
                    data[i]['status_dok'] + "</td>" +
                  "</tr>");

                  $("#form-entri-b5 > tbody").append(
                  "<tr id='"+data[i]['_id']+"'>"+
                    "<td>"+
                    "<input type='hidden' value='"+data[i]['_id']+"' />"+
                    "<input type='text' value='"+data[i]['sls']+"' class='entri-p-form-rt-sls'/></td><td>"+
                    "<input type='text' class='entri-p-form-rt-nbf'value='"+data[i]['nbf']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-nbs' type='text' value='"+data[i]['nks']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-nort' type='text' value='"+data[i]['nort']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-nama_krt' type='text' value='"+data[i]['nama_krt']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-alamat' type='text' value='"+data[i]['alamat']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-keberadaan_rt' type='text' value='"+data[i]['keberadaan_rt']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-nurt' type='text' value='"+data[i]['nurt']+"' /></td><td>"+
                    "<input class='entri-p-form-rt-jml_art' type='text' value='"+data[i]['jml_art']+"' /></td>"+
                  '</tr>');
                  }
            } else {
                $("#entri-p > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
            }

            // generate-clickHandler
            var entri_p = document.getElementById('entri-p'),rIndex; // entri_p di ekstrak & jadi listener
            var form_entri_p_p1 = document.getElementById('form-entri-p-1'),rIndex; // FORM diubah

            var _sem = this.state.entri_p_sem_val;
            var _kode_prov = this.state.entri_p_prov_val;
            var _kode_kab = this.state.entri_p_kab_val;
            var _kode_kec = '';
            var _kode_desa = '';
            var _nks = '';
            var _sls = '';

            // alert(entri_p.rows.length);
            // alert(form_entri_p_p1.rows[0].cells.length);

            for (var i=0; i<entri_p.rows.length; i++) {
              entri_p.rows[i].onclick = function() {
                    //--- onclick: change_state kec, desa, nks, sls

                    _kode_kec = this.cells[1].innerHTML;
                    _kode_desa = this.cells[2].innerHTML;
                    _nks = this.cells[3].innerHTML;
                    _sls = this.cells[4].innerHTML;

                    // alert(this.cells[4].innerHTML);

                    // alert(form_entri_p_p1.cells[0].innerHTML);
                    form_entri_p_p1.rows[0].cells[1].innerHTML = _sem;
                    form_entri_p_p1.rows[1].cells[1].innerHTML = _kode_prov;
                    form_entri_p_p1.rows[2].cells[1].innerHTML = _kode_kab;
                    form_entri_p_p1.rows[3].cells[1].innerHTML = _kode_kec;
                    form_entri_p_p1.rows[4].cells[1].innerHTML = _kode_desa;
                    form_entri_p_p1.rows[5].cells[1].innerHTML = _sls;
                    form_entri_p_p1.rows[6].cells[1].innerHTML = _nks;
              };
            }

            // alert('old: ' + JSON.stringify(this.state));

            this.setState({
                entri_p_kec_val: _kode_kec.toString(),
                entri_p_desa_val: _kode_desa.toString(),
                entri_p_nks_val: _nks.toString(),
                entri_p_sls_val: _sls.toString(),
            },()=>{
              // alert('new: '+ JSON.stringify(this.state));
            });
        }.bind(this));

        // alert(JSON.stringify(this.state));
  }

  changeHandlerSem(childComponent) {
    // alert(childComponent.target.value);
    this.setState({
      entri_p_sem_val: childComponent.target.value.toString()
    });
  }

  changeHandlerProv(event) {
    var temp = $('#entri-p-prov option:selected').text().substring(1,3);
    this.setState({
      entri_p_prov_val:temp,
      entri_p_kab_val:'01',
    }, () => {
    $("#entri-p-kab > option").remove();
    var data = this.state.entri_p_kab_list;
    // rubah pilihan pada dropdown list kabupaten
    for (var i=0; i<data.length; i++)
      if(data[i]['kode_prov'] == this.state.entri_p_prov_val) {
          $("#entri-p-kab").append(
            "<option value="+ data[i]['kode_kab'] +">["+data[i]['kode_kab'] + "] " + data[i]['nama_kab'] + "</option>"
          );
        }
    });
  }

  changeHandlerKab(childComponent) {
        // var temp = $('#entri-p-kab option:selected').text();
        var temp = childComponent.target.value;
        // alert(temp);
        this.setState({
              entri_p_kab_val:temp
        },()=>{
          // alert(this.state.entri_p_kab_val);
        });
    }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4" >
        {/* DROPDOWN */}
        <label for="entri-p-sem">Semester:</label>
        <select class="form-control" id="entri-p-sem" onChange={this.changeHandlerSem.bind(this)}  value={this.state.entri_p_sem_val}>
          <option>1</option>
          <option>2</option>
        </select>

        <label for="entri-p-prov">Provinsi:</label>
        <select class="form-control" id="entri-p-prov" onChange={this.changeHandlerProv.bind(this)} value={this.state.entri_p_prov_val}>
        </select>

        <label for="entri-p-kab">Kabupaten:</label>
        <select class="form-control" id="entri-p-kab" onChange={this.changeHandlerKab.bind(this)} value={this.state.entri_p_kab_val}>
        </select>

        <br />
        <button id="btn-refresh" type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      {/* TABLE */}
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
              <td>1</td>
              <td>020</td>
              <td>028</td>
              <td>15013</td>
              <td>DUSUN MELATI</td>
              <td>C</td>
            </tr>
            <tr>
              <td>2</td>
              <td>020</td>
              <td>030</td>
              <td>15029</td>
              <td>DUSUN TAUHAO</td>
              <td>C</td>
            </tr>
            <tr>
              <td>3</td>
              <td>020</td>
              <td>035</td>
              <td>15060</td>
              <td>DUSUN MAWAR</td>
              <td>C</td>
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
            <div id="form-entri-p">
                <table class="table table-striped table-bordered" id="form-entri-p-1">
                <h3>Form Entri Pemutakhiran Data Ruta</h3>
                    <tbody>
                        <tr>
                            <td>Semester: </td>
                            <td class='edit'>{this.state.entri_p_sem_val}
                            </td>
                        </tr>
                        <tr>
                            <td>Provinsi: </td>
                            <td class='edit'>{this.state.entri_p_prov_val}
                            </td>
                        </tr>
                        <tr>
                            <td>Kab/Kota: </td>
                            <td class='edit'>{this.state.entri_p_kab_val}
                            </td>
                        </tr>
                        <tr>
                            <td>Kecamatan: </td>
                            <td class='edit'>{this.state.entri_p_kec_val}
                            </td>
                        </tr>
                        <tr>
                            <td>Desa: </td>
                            <td class='edit'>{this.state.entri_p_desa_val}
                            </td>
                        </tr>
                        <tr>
                            <td>SLS: </td>
                            <td class='edit'>{this.state.entri_p_sls_val}
                            </td>
                        </tr>
                        <tr>
                            <td>NKS: </td>
                            <td class='edit'>{this.state.entri_p_nks_val}
                            </td>
                        </tr>
                        <tr>
                            <td>Jumlah RT hasil pemutakhiran: </td>
                            <td class='edit'>
                                <input type="text" value="" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-striped table-bordered" id="form-entri-p-2">
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
                                  <input id="entri-p-form-b3_r1a" type="text" />
                            </td>
                            <td>
                                <input id="entri-p-form-b3_r1b" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>Tanggal</td>
                            <td>
                                <input id="entri-p-form-b3_r2a" type="date" />
                            </td>
                            <td>
                                <input id="entri-p-form-b3_r2b" type="date" />
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
                                <textarea id="entri-p-form-b4_rcat" type="text"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                </div>
                </div>
                <div id="hal2" class="tab-pane fade">
                <div id="form-entri-p-4">
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
                              <td><input type="text" value="sls" id="entri-p-form-rt-sls"/></td>
                              <td><input type="text" id="entri-p-form-rt-nbf"value="nbf" /></td>
                              <td><input id="entri-p-form-rt-nbs" type="text" value="nbs" /></td>
                              <td><input id="entri-p-form-rt-nort" type="text" value="nort" /></td>
                              <td><input id="entri-p-form-rt-nama_krt" type="text" value="nama_krt" /></td>
                              <td><input id="entri-p-form-rt-alamat" type="text" value="alamat" /></td>
                              <td><input id="entri-p-form-rt-keberadaan_rt" type="text" value="keberadaan_rt" /></td>
                              <td><input id="entri-p-form-rt-nurt" type="text" value="nurt" /></td>
                              <td><input id="entri-p-form-rt-jml_art" type="text" value="jml_art" /></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-warning" id="add-btn-add" onClick={this.add}>Add</button>
              <button type="button" class="btn btn-warning" id="add-btn-save" onClick={this.save} data-dismiss="modal">Save</button>
              <button type="button" class="btn btn-warning" id="add-btn-generate" onClick={this.generate}>Generate Sample</button>
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

export default Entri_p;
