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

          $.ajax(set_settings("https://sakernas-api.herokuapp.com/master-prov")).done(function (_data) {

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

                // get data: kabupaten
                $.ajax(set_settings("https://sakernas-api.herokuapp.com/master-kab")).done(function (_data) {
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

                      // get data: Kecamatan
                      $.ajax(set_settings("https://sakernas-api.herokuapp.com/master-kec")).done(function (_data) {
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

                            // get data: desa
                            $.ajax(set_settings("https://sakernas-api.herokuapp.com/master-desa")).done(function (_data) {
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

                                  $("#dsrt-desa").val(data[first]['kode_desa']);

                                  this.setState({
                                    dsrt_desa_list: data,
                                    dsrt_desa_val:$("#dsrt-desa").val()
                                  });

                                  // get data: nbs/nks
                                  $.ajax(set_settings("https://sakernas-api.herokuapp.com/master-nks")).done(function (_data) {
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
                                        });
                                  }.bind(this));
                            }.bind(this));
                      }.bind(this));
                }.bind(this));
          }.bind(this));
      }.bind(this));
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

    $.get("https://sakernas-api.herokuapp.com/dsrt",
        query,
        function(data, status) {
            $("#dsrt > tbody > tr").remove();

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#dsrt > tbody").append(
                  // "<tr class='form-data' data-toggle='modal' data-target='#form'>"+
                  "<tr>"+
                      "<td>"+
                      data[i]['no_dsrt'] + "</td><td>" +
                      data[i]['nama_krt'] + "</td><td>" +
                      data[i]['alamat'] + "</td><td>" +
                      data[i]['NURT'] + "</td>" +
                  "</tr>");
                  }
            else
                $("#dsrt > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
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
            <tr>
              <td>1</td>
              <td>SAMSUL BAHRI</td>
              <td>DUSUN MELATI</td>
              <td>3</td>
            </tr>
            <tr>
              <td>2</td>
              <td>FADLI ISMAIL</td>
              <td>DUSUN MELATI</td>
              <td>4</td>
            </tr>
            <tr>
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
            <tr>
              <td>5</td>
              <td>DIDI ARIANTO</td>
              <td>DUSUN MELATI</td>
              <td>2</td>
            </tr>
        </tbody>
      </table>

      </div>
    );
  }
}

export default Dsrt;
