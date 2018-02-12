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
class Entri_p_form extends Component {

  constructor(props) {
      super(props);
      var data_pemutakhiran = [];

      // set props sesuai dengan props entri_p
      // ...
      var entri_p_sem = props.entri_p_sem;
      var entri_p_prov = props.entri_p_prov;
      var entri_p_kab = props.entri_p_kab;
      var entri_p_kec = props.entri_p_kec;
      var entri_p_desa = props.entri_p_desa;
      var entri_p_nks = props.entri_p_nks;

      $(document).ready(function(){
          // get data sesuai dengan props
          $.get("http://localhost:8002/pemutakhiran",
          {
            entri_p_sem: entri_p_sem,
            entri_p_prov: entri_p_prov,
            entri_p_kab: entri_p_kab,
            entri_p_kec: entri_p_kec,
            entri_p_desa: entri_p_desa,
            entri_p_nks: entri_p_nks
          },
          function(data, status) {
            // alert(JSON.stringify(data)); //debug

            // generate top_table

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

      });
  }

  // function: refresh
  refresh(e) {
    e.preventDefault();



  }

  render() {
    return (
      <div id="container" class="col-lg-12 main">

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

          <button type="button" class="btn btn-default">Add</button>
          <button type="button" class="btn btn-default">Save</button>
          <button type="button" class="btn btn-default">Delete</button>
          <button type="button" class="btn btn-default">Generate Sample</button>
      </div>
    );
  }
}

export default Entri_p_form;
