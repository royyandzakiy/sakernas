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

      this.state = {
        petugas_lap_sem_val: '1',
        petugas_lap_prov_list: {},
        petugas_lap_prov_val: '00',
        petugas_lap_kab_list: {},
        petugas_lap_kab_val: '01',
        petugas_lap_kec_val: '01',
        petugas_lap_desa_val: '01',
        petugas_lap_nks_val: '01',
        petugas_lap_sls_val: '01',
        petugas_lap_id: 'NULL',
        pengawas_id:'',
        pencacah_id:''
      };

      this.deletePengawas = this.deletePengawas.bind(this);
      this.deletePencacah = this.deletePencacah.bind(this);
      this.refresh = this.refresh.bind(this);
      this.save = this.save.bind(this);
      this.saveEditPengawas = this.saveEditPengawas.bind(this);
      this.saveEditPencacah = this.saveEditPencacah.bind(this);
      this.saveEdit = this.saveEdit.bind(this);
    }

  componentDidMount() {

      $(document).ready(function(){
      // INIT
          this.setState({
            petugas_lap_sem_val: '1'
          });

      // 1. get dropdown data
          // get data: provinsi
          $.get("https://sakernas-api.herokuapp.com/master-prov",
              {},
              function(_data, status) {

                for (var i=0; i<_data.length; i++) {
                    $("#petugas-lap-prov").append(
                      "<option " + (i==0 ? "selected" : "") +
                      "value="+_data[i]['kode_prov']+">["+_data[i]['kode_prov']+"] "+_data[i]['nama_prov']+"</option>"
                    );
                  }

                  this.setState({
                    petugas_lap_prov_list: _data,
                    petugas_lap_prov_val: _data[0]['kode_prov']
                  });

                  // isi list kabupaten
                  $.get("https://sakernas-api.herokuapp.com/master-kab",
                      {kode_prov: this.state.petugas_lap_prov_val},
                      function(_data, status) {
                          var data = _data;
                          var first = data.length -1;
                          $("#petugas-lap-kab > option").remove();

                          if (_data.length != 0)
                          for (var i=0; i<_data.length; i++) {
                            if(_data[i]['kode_prov'] == this.state.petugas_lap_prov_val) {
                              first = (i < first ? i : first);
                              $("#petugas-lap-kab").append(
                                "<option value='"+_data[i]['kode_kab']+"'>["+_data[i]['kode_kab']+"] "+_data[i]['nama_kab']+"</option>"
                              );
                            }
                          }

                          $("#petugas-lap-kab").val(_data[first]['kode_kab']);

                          this.setState({
                            petugas_lap_kab_list: _data,
                            petugas_lap_kab_val: _data[0]['kode_kab']
                          });

                      }.bind(this));
              }.bind(this));

              var pengawas_id,pencacah_id;

      //2. set click listener
          $('#petugas-lap').on('click', '.clickable-row', function(event) { // table #cek-kewajaran
              $(this).addClass('active').siblings().removeClass('active');
              $('#edit-jenis').val("2");
              $('#edit-id').val($(this).attr('id'));
              pengawas_id = $("#petugas-lap tr.active").attr('id');

              $("#pengawas-selected-id").val(pengawas_id); // penyimpan id pengawas selevted
          });
          $('#pencacah-lap').on('click', '.clickable-row', function(event) { // table #cek-kewajaran
              $(this).addClass('active').siblings().removeClass('active');
              $('#edit-jenis').val("1");
              $('#edit-id').val($(this).attr('id'));
              pencacah_id = $("#pencacah-lap tr.active").attr('id');

              $("#pencacah-selected-id").val(pencacah_id); // penyimpan id pengawas selevted
          });

      }.bind(this));
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

  // function: edit
  editPengawas(e) {
    e.preventDefault();

    var edit_petugas_sem = $('#petugas-lap-sem option:selected').val();
    var edit_petugas_prov = $('#petugas-lap-prov option:selected').val();
    var edit_petugas_kab = $('#petugas-lap-kab option:selected').val();
    var edit_petugas_kode = $('#petugas-lap tr.active td:eq(0)').text();
    var edit_petugas_nama = $('#petugas-lap tr.active td:eq(1)').text();
    var edit_petugas_desk = $('#petugas-lap tr.active td:eq(2)').text();
    var edit_petugas_notelp = $('#petugas-lap tr.active td:eq(3)').text();
    var edit_petugas_jenis = 2;

    var _id = $('#petugas-lap tr.active').attr('id');
    console.log(_id);

    $(document).ready(function(){
        $('#edit-sem').val(edit_petugas_sem);
        $('#edit-prov').val(edit_petugas_prov);
        $('#edit-kab').val(edit_petugas_kab);
        $('#edit-kode-pengawas').val(edit_petugas_kode);
        $('#edit-nama-pengawas').val(edit_petugas_nama);
        $('#edit-status-pengawas').val(edit_petugas_desk);
        $('#edit-telp-pengawas').val(edit_petugas_notelp);
        $('#edit-jenis-pengawas').val(edit_petugas_jenis);
    });
  }

  // function: edit
  editPencacah(e) {
    e.preventDefault();

    var edit_petugas_sem = $('#petugas-lap-sem option:selected').val();
    var edit_petugas_prov = $('#petugas-lap-prov option:selected').val();
    var edit_petugas_kab = $('#petugas-lap-kab option:selected').val();
    var edit_petugas_kode = $('#pencacah-lap tr.active td:eq(0)').text();
    var edit_petugas_nama = $('#pencacah-lap tr.active td:eq(1)').text();
    var edit_petugas_desk = $('#pencacah-lap tr.active td:eq(2)').text();
    var edit_petugas_notelp = $('#pencacah-lap tr.active td:eq(3)').text();
    var edit_petugas_jenis = 1;

    var _id = $('#pencacah-lap tr.active').attr('id');
    console.log(_id);

    $(document).ready(function(){
        $('#edit-sem').val(edit_petugas_sem);
        $('#edit-prov').val(edit_petugas_prov);
        $('#edit-kab').val(edit_petugas_kab);
        $('#edit-kode-pencacah').val(edit_petugas_kode);
        $('#edit-nama-pencacah').val(edit_petugas_nama);
        $('#edit-status-pencacah').val(edit_petugas_desk);
        $('#edit-telp-pencacah').val(edit_petugas_notelp);
        $('#edit-jenis-pencacah').val(edit_petugas_jenis);
    });
  }

  saveEditPencacah() {
      this.saveEdit("1");
  }

  saveEditPengawas() {
      this.saveEdit("2");
  }

  // function: saveEdit
  saveEdit(jenis_petugas) {
    var _id_pengawas = $("#pengawas-selected-id").val(); // penyimpan id pengawas selevted;
    var _id_pencacah = $("#pencacah-selected-id").val(); // penyimpan id pengawas selevted;

    var edit_petugas_jenis = jenis_petugas;

    var edit_petugas_sem = $('#petugas-lap-sem option:selected').val();
    var edit_petugas_prov = $('#petugas-lap-prov option:selected').val();
    var edit_petugas_kab = $('#petugas-lap-kab option:selected').val();

    var _id = (edit_petugas_jenis == '1' ? _id_pencacah : _id_pengawas );

    if (edit_petugas_jenis == '2') {
        var edit_petugas_kodepetugas = $('#edit-kode-pengawas').val();
        var edit_petugas_namapetugas = $('#edit-nama-pengawas').val();
        var edit_petugas_status = $('#edit-status-pengawas').val();
        var edit_petugas_telp = $('#edit-telp-pengawas').val();
    } else {
        var edit_petugas_kodepetugas = $('#edit-kode-pencacah').val();
        var edit_petugas_namapetugas = $('#edit-nama-pencacah').val();
        var edit_petugas_status = $('#edit-status-pencacah').val();
        var edit_petugas_telp = $('#edit-telp-pencacah').val();
    }

    var temp = {
      edit_petugas_sem:edit_petugas_sem,
      edit_petugas_prov:edit_petugas_prov,
      edit_petugas_kab:edit_petugas_kab,
      edit_petugas_kodepetugas:edit_petugas_kodepetugas,
      edit_petugas_namapetugas:edit_petugas_namapetugas,
      edit_petugas_status:edit_petugas_status,
      edit_petugas_telp:edit_petugas_telp,
      edit_petugas_jenis:edit_petugas_jenis,
    };

    // alert("_id: "+JSON.stringify(_id));
    // alert("data: "+JSON.stringify(temp));
    var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://sakernas-api.herokuapp.com/petugas-lap/update/"+_id,
          // "url": "https://sakernas-api.herokuapp.com/petugas-lap/update/"+_id,
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

  // function: save
  save(jenis) {

    var add_petugas_sem = $('#add-sem').val();
    var add_petugas_prov = $('#petugas-lap-prov option:selected').val().substring(1,3);
    var add_petugas_kab = $('#add-kab').val();
    var add_petugas_kodepetugas = $('#add-kode-petugas').val();$('#add-kode-petugas').val("");
    var add_petugas_namapetugas = $('#add-nama-petugas').val();$('#add-nama-petugas').val("");
    var add_petugas_status = $('#add-status').val();$('#add-status').val("");
    var add_petugas_telp = $('#add-telp').val();$('#add-telp').val("");
    var add_petugas_jenis = $('#add-jenis').val();$('#add-jenis').val("");

    var temp = {
      add_petugas_sem:add_petugas_sem,
      add_petugas_prov:add_petugas_prov,
      add_petugas_kab:add_petugas_kab,
      add_petugas_kodepetugas:add_petugas_kodepetugas,
      add_petugas_namapetugas:add_petugas_namapetugas,
      add_petugas_status:add_petugas_status,
      add_petugas_telp:add_petugas_telp,
      add_petugas_jenis:add_petugas_jenis
    };

    $.post("https://sakernas-api.herokuapp.com/petugas-lap/add",
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

  // function: delete
  deletePengawas(e) {
    e.preventDefault();

    var _id = $("#pengawas-selected-id").val(); // penyimpan id pengawas selevted;

    console.log(_id);

    var deleteConfirm = window.confirm("Yakin akan menghapus data terpilih?");

    // kirim utk hapus
    if(deleteConfirm)
    var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://sakernas-api.herokuapp.com/petugas-lap/"+_id,
          // "url": "https://sakernas-api.herokuapp.com/petugas-lap/update/"+_id,
          "method": "DELETE",
          "headers": {
          "cache-control": "no-cache",
          "postman-token": "979f6bf0-2751-c970-018d-e5b138487bec"
          }
      }

      $.ajax(settings).done(function (response) {
          console.log(response);
      });
  }

  deletePencacah(e) {
    e.preventDefault();

    var _id = $("#pencacah-selected-id").val(); // penyimpan id pengawas selevted;

    console.log(_id);

    var deleteConfirm = window.confirm("Yakin akan menghapus data terpilih?");

    // kirim utk hapus
    if(deleteConfirm)
    var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://sakernas-api.herokuapp.com/petugas-lap/"+_id,
          // "url": "https://sakernas-api.herokuapp.com/petugas-lap/update/"+_id,
          "method": "DELETE",
          "headers": {
          "cache-control": "no-cache",
          "postman-token": "979f6bf0-2751-c970-018d-e5b138487bec"
          }
      }

      $.ajax(settings).done(function (response) {
          console.log(response);
      });
  }

  // function: refresh
  refresh(e) {
    e.preventDefault();

    var temp = {
      petugas_lap_sem:$('#petugas-lap-sem option:selected').val(),
      petugas_lap_prov:$('#petugas-lap-prov option:selected').val(),
      petugas_lap_kab:$('#petugas-lap-kab option:selected').val()
    };

    // alert(JSON.stringify(temp)); //debug
    // remove rows
    $("#petugas-lap > tbody > tr").remove();
    $("#pencacah-lap > tbody > tr").remove();

    $.get("https://sakernas-api.herokuapp.com/petugas-lap",
        temp,
        function(data, status) {
            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  if(data[i].jenis_petugas == '2') {
                    $("#petugas-lap > tbody").append(
                    "<tr class='form-data clickable-row' id='"+ data[i]['_id']  +"'>"+
                      "<td>"+
                      data[i]['kode_petugas'] + "</td><td>" +
                      data[i]['nama'] + "</td><td>" +
                      data[i]['no_telp'] + "</td><td>" +
                      data[i]['jabatan_petugas'] + "</td>" +
                    "</tr>");
                  } else if (data[i].jenis_petugas == '1') {
                    $("#pencacah-lap > tbody").append(
                    "<tr class='form-data clickable-row' id='"+ data[i]['_id']  +"'>"+
                      "<td>"+
                      data[i]['kode_petugas'] + "</td><td>" +
                      data[i]['nama'] + "</td><td>" +
                      data[i]['no_telp'] + "</td><td>" +
                      data[i]['jabatan_petugas'] + "</td>" +
                    "</tr>");
                    }
                  }
            else {
                $("#petugas-lap > tbody").append(
                "<tr class='empty-data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
                $("#pencacah-lap > tbody").append(
                "<tr class='empty-data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
              }
        });
  }

  changeHandlerSem(childComponent) {
    this.setState({
      petugas_lap_sem_val: childComponent.target.value
    },()=>{
      // alert(this.state.petugas_lap_sem_val);
    });
  }

  changeHandlerProv(childComponent) {

    if (typeof childComponent == 'string')
      var temp = childComponent;
    else if (childComponent.target.value.length > 2)
      var temp = childComponent.target.value.substring(1,3);
    else
      var temp = childComponent.target.value;
    this.setState({
      petugas_lap_prov_val:temp,
      petugas_lap_kab_val:'01',
    }, () => {
      // alert(this.state.petugas_lap_prov_val);
    $("#petugas-lap-kab > option").remove();
    var data = this.state.petugas_lap_kab_list;
    // rubah pilihan pada dropdown list kabupaten
    for (var i=0; i<data.length; i++)
      if(data[i]['kode_prov'] == this.state.petugas_lap_prov_val) {
          $("#petugas-lap-kab").append(
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

        this.setState({
              petugas_lap_kab_val:temp
        },()=>{
          // alert(this.petugas_lap_kab_val);
        });
    }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

      <div class="form-group col-lg-4">
        <label for="petugas-lap-sem">Semester:</label>
        <select class="form-control" id="petugas-lap-sem" onChange={this.changeHandlerSem.bind(this)}  value={this.state.petugas_lap_sem_val}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <label for="petugas-lap-prov">Provinsi:</label>
        <select class="form-control" id="petugas-lap-prov" onChange={this.changeHandlerProv.bind(this)}  value={this.state.petugas_lap_prov_val}>
        </select>

        <label for="petugas-lap-kab">Kabupaten:</label>
        <select class="form-control" id="petugas-lap-kab" onChange={this.changeHandlerKab.bind(this)}  value={this.state.petugas_lap_kab_val}>
        </select>

        <br />
        <button type="button" class="btn btn-success" onClick={this.refresh}>Refresh</button>
      </div>

      <div class="col-lg-12">

      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#hal1">Pengawas</a></li>
        <li><a data-toggle="tab" href="#hal2">Pencacah</a></li>
      </ul>

      <div class="tab-content">
        <div id="hal1" class="tab-pane fade in active">
          <h3>Pengawas</h3>

      <table id="petugas-lap" class="table table-striped table table-bordered table-hover">
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
              <td>102</td>
              <td>DJAMALUDDIN</td>
              <td>081280185069</td>
              <td>2 Staff BPS Kabupaten/Kota</td>
            </tr>
          </tbody>
      </table>

      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.add}>Add Petugas</button>
      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#edit-pengawas" onClick={this.editPengawas}>Edit Pengawas</button>
      <button type="button" class="btn btn-default" onClick={this.deletePengawas}>Delete Pengawas</button>

      </div>

      <div id="hal2" class="tab-pane fade in">
        <h3>Pencacah</h3>

        <table id="pencacah-lap" class="table table-striped table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Kode Pencacah</th>
                    <th>Nama Pencacah</th>
                    <th>No Telp</th>
                    <th>Status Pencacah</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>502</td>
                <td>BAYU RIANTA</td>
                <td>081233974213</td>
                <td>3 Staff BPS Kabupaten/Kota</td>
              </tr>
            </tbody>
        </table>

        <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.add}>Add Petugas</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#edit-pencacah" onClick={this.editPencacah}>Edit Pencacah</button>
        <button type="button" class="btn btn-default" onClick={this.deletePencacah}>Delete Pencacah</button>
      </div>


    </div>


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
                <tr>
                  <th>Jenis :</th>
                    <td>	Pencacah (1) / Pengawas (2)<input type="text" class="form-control" id="add-jenis" /></td>
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


      <div id="edit-pengawas" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Edit Pengawas</h4>
            </div>
            <div class="modal-body">

            <table class="table-condensed">
              <tbody>
                <tr>
                  <th>Semester :</th>
                    <td><input type="text" class="form-control" id="edit-sem-pengawas" disabled value={this.state.petugas_lap_sem_val}/>
                    <input type="hidden" class="form-control" id="edit-id-pengawas" disabled value=''/>
                    <input type="hidden" class="form-control" id="pengawas-selected-id" disabled value=''/></td>
                </tr>
                <tr>
                  <th>Provinsi :</th>
                    <td><input type="text" class="form-control" id="edit-prov-pengawas" disabled value={this.state.petugas_lap_prov_val}/></td>
                </tr>
                <tr>
                  <th>Kabupaten :</th>
                    <td><input type="text" class="form-control" id="edit-kab-pengawas" disabled value={this.state.petugas_lap_kab_val}/></td>
                </tr>
                <tr>
                  <th>Kode Petugas :</th>
                    <td><input type="text" class="form-control" id="edit-kode-pengawas" /></td>
                </tr>
                <tr>
                  <th>Nama Petugas :</th>
                    <td><input type="text" class="form-control" id="edit-nama-pengawas" /></td>
                </tr>
                <tr>
                  <th>Deskripsi Status :</th>
                    <td><input type="text" class="form-control" id="edit-status-pengawas" /></td>
                </tr>
                <tr>
                  <th>No Telp :</th>
                    <td><input type="text" class="form-control" id="edit-telp-pengawas" /></td>
                </tr>
                <tr>
                  <th>Jenis :</th>
                    <td>Pencacah (1) / Pengawas (2)<input type="text" class="form-control" id="edit-jenis-pengawas" /></td>
                </tr>
            </tbody>
            </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal" id="add-btn-save" onClick={this.saveEditPengawas}>Save</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>

      <div id="edit-pencacah" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Edit Pencacah</h4>
            </div>
            <div class="modal-body">

            <table class="table-condensed">
              <tbody>
                <tr>
                  <th>Semester :</th>
                    <td><input type="text" class="form-control" id="edit-sem-pencacah" disabled value={this.state.petugas_lap_sem_val}/>
                    <input type="hidden" class="form-control" id="edit-id-pencacah" disabled value=''/>
                    <input type="hidden" class="form-control" id="pencacah-selected-id" disabled value=''/></td>
                </tr>
                <tr>
                  <th>Provinsi :</th>
                    <td><input type="text" class="form-control" id="edit-prov-pencacah" disabled value={this.state.petugas_lap_prov_val}/></td>
                </tr>
                <tr>
                  <th>Kabupaten :</th>
                    <td><input type="text" class="form-control" id="edit-kab-pencacah" disabled value={this.state.petugas_lap_kab_val}/></td>
                </tr>
                <tr>
                  <th>Kode Petugas :</th>
                    <td><input type="text" class="form-control" id="edit-kode-pencacah" /></td>
                </tr>
                <tr>
                  <th>Nama Petugas :</th>
                    <td><input type="text" class="form-control" id="edit-nama-pencacah" /></td>
                </tr>
                <tr>
                  <th>Deskripsi Status :</th>
                    <td><input type="text" class="form-control" id="edit-status-pencacah" /></td>
                </tr>
                <tr>
                  <th>No Telp :</th>
                    <td><input type="text" class="form-control" id="edit-telp-pencacah" /></td>
                </tr>
                <tr>
                  <th>Jenis :</th>
                    <td>Pencacah (1) / Pengawas (2)<input type="text" class="form-control" id="edit-jenis-pencacah" /></td>
                </tr>
            </tbody>
            </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal" id="add-btn-save" onClick={this.saveEditPencacah}>Save</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>


      </div>

      </div>
    );
  }
}

export default Petugas_lap;
