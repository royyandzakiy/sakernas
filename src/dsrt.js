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
class Dsrt extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

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
                  "<tr class='form-data' onclick=\"document.location = 'form-entri-p.html';\">"+
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
      </div>
    );
  }
}

export default Dsrt;
