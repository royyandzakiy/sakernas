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
class Revalidasi extends Component {

  constructor(props) {
      super(props);

      this.changeHandlerProv = this.changeHandlerProv.bind(this);
      this.changeHandlerKab = this.changeHandlerKab.bind(this);
      this.changeHandlerSem = this.changeHandlerSem.bind(this);
      this.revalidasi = this.revalidasi.bind(this);
      this.refresh = this.refresh.bind(this);
      this.save = this.save.bind(this);

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

  componentDidMount() {
    // INIT table #cek-kewajaran
    $("#cek-kewajaran > tbody > tr").remove();
    for (var i=0; i<12; i++) {
      $("#cek-kewajaran > tbody").append(
      "<tr class='form-data clickable-row'>"+
        "<td>"+
        i*5+"-"+(5*(i+1)-1)+"</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td>" +
      "</tr>");

      }
      $("#cek-kewajaran > tbody").append(
        "<tr class='form-data clickable-row'>"+
        "<td>"+
        "60+</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td><td>" +
        "</td>" +
        "</tr>");

    // SET states, INIT dropdowns
    this.setState({
      entri_p_sem_val: '1'
    });

    $.get("https://sakernas-api.herokuapp.com/master-prov",
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
    $.get("https://sakernas-api.herokuapp.com/master-kab",
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
    // do something
  }

  revalidasi(e) {

  }

  // function: revalidasi
  refresh(e) {
    e.preventDefault();

    var query = {
      semester:this.state.entri_p_sem_val,
      kode_prov:this.state.entri_p_prov_val,
      kode_kab:this.state.entri_p_kab_val
    }

    $("#revalidasi > tbody > tr").remove();

    $.get("https://sakernas-api.herokuapp.com/data-art",
        query,
        function(data, status) {
        // alert(JSON.stringify(data));

        if(data.length > 0) {
          for(var i=0; i<data.length; i++){
            $("#revalidasi > tbody").append(
            "<tr class='form-data clickable-row'>"+
              "<td>"+
              (i+1) + "</td><td>" +
              data[i].b5_rnama  + "</td>" +
            "</tr>");
          }
        } else {
          $("#revalidasi > tbody").append(
          "<tr class='form-data clickable-row'>"+
            "<td colspan='6'>Tidak ada data yang sesuai</td>"+
          "</tr>");
        }
    });
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
        <button type="button" class="btn btn-success" onClick={this.refresh}>refresh</button>
      </div>

      <table id="revalidasi" class="table table-bordered table-striped table-hover" >
          <thead>
              <tr>
                  <th colSpan='1'>No.</th>
                  <th colSpan='4'>Nama KRT</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='5'>Tekan revalidasi</td>
            </tr>
          </tbody>
      </table>

      <button type="button" class="btn btn-default"  data-toggle="modal" data-target="#add" onClick={this.revalidasi}>Start Revalidasi</button>
      <button type="button" class="btn btn-default" onClick={this.save}>Save</button>

      </div>
    );
  }
}

export default Revalidasi;
