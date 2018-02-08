import React, { Component } from 'react';
// table stuff
import $ from 'jquery';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
class Entri_p extends Component {

  constructor(props) {
      super(props);

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

        //tes selected table
        var $table = $('#table'),
            $button = $('#button');
        $(function () {
            $button.click(function () {
                alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')));
            });
        });

    });
  }

  // function: form
  form(e) {
    e.preventDefault();

    var entri_p_sem = $('#entri-p-sem option:selected').val();
    var entri_p_prov = $('#entri-p-prov option:selected').val();
    var entri_p_kab = $('#entri-p-kab option:selected').val();
    var entri_p_kec = $('#entri-p-kab option:selected').val();
    var entri_p_desa = $('#entri-p-kab option:selected').val();
    var entri_p_nks = $('#entri-p-kab option:selected').val();

  }

  // function: refresh
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

            // remove rows
            $("#entri-p > tbody > tr").remove();

            // generate rows
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#entri-p > tbody").append(
                  "<tr class='form-data' >"+
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

      <button type="button" class="btn btn-default"  data-toggle='modal' data-target='#form' onClick={this.form}>Edit</button>

      <div id="form" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">

          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Form Entri Pemutakhiran</h4>
            </div>
            <div class="modal-body">

            <table class="table col-lg-4">
              <tbody>
                <tr>
                  <th>Semester</th>
                    <td>1</td>
                </tr>
                <tr>
                  <th>Provinsi</th>
                    <td>[11] ACEH</td>
                </tr>
                <tr>
                  <th>Kabupaten</th>
                    <td>[01] SIMEULUE</td>
                </tr>
                <tr>
                  <th>Kecamatan</th>
                    <td>[029] SIMEULUE TIMUR</td>
                </tr>
                <tr>
                    <th>Desa</th>
                      <td>[001] DeSA SUKAMAJU</td>
                </tr>
                <tr>
                  <th>NKS</th>
                    <td>13412</td>
                </tr>
            </tbody>
            </table>

            <table class="table table-hover">
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
                <tr>
                  <td>001</td>
                  <td>010</td>
                  <td>010</td>
                  <td>001</td>
                  <td>IRBON</td>
                  <td>DUSUN A</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>001</td>
                  <td>010</td>
                  <td>010</td>
                  <td>001</td>
                  <td>IRBON</td>
                  <td>DUSUN A</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>001</td>
                  <td>010</td>
                  <td>010</td>
                  <td>001</td>
                  <td>IRBON</td>
                  <td>DUSUN A</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
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

      hohoohohohoho

      <div id="toolbar">
          <button id="button" class="btn btn-default">getSelections</button>
      </div>
      <table id="table"
             data-toggle="table"
             data-toolbar="#toolbar"
             data-height="460"
             data-click-to-select="true"
             data-url="json/data.json">
          <thead>
          <tr>
              <th data-field="state" data-checkbox="true"></th>
              <th data-field="id">ID</th>
              <th data-field="name">Item Name</th>
              <th data-field="price">Item Price</th>
          </tr>
          </thead>
      </table>
      </div>
    );
  }
}

export default Entri_p;
