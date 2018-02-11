import React, { Component } from 'react';
import Modal from './modal';
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
      this.state = {
        entri_p_sem_val: '1',
        entri_p_prov_list: {},
        entri_p_prov_val: '00',
        entri_p_kab_list: {},
        entri_p_kab_val: '01',
      };

  }

  componentDidMount() {

        // isi list provinsi
        $.get("http://localhost:8002/master-prov",
            {},
            function(_data, status) {
                // alert(JSON.stringify(_data)); //debug

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

  //--- function: refresh
  refresh(e) {
    e.preventDefault();

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
                  "</tr>");

                  // generate-modal
                  }
            else
                $("#entri-p > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });
  }

  changeHandlerSem(childComponent) {
    // alert(childComponent.target.value);
    this.setState({
      entri_p_sem_val: childComponent.target.value.toString()
    });
  }

  changeHandlerProv(event) {
    this.setState({
      entri_p_prov_val:event.target.value
    }, () => {
    $("#entri-p-kab > option").remove();
    var data = this.state.entri_p_kab_list;
    // alert(JSON.stringify(data));
    // alert(JSON.stringify(this.state.entri_p_prov_val));
    // alert(JSON.stringify(this.state.entri_p_kab_val));

    // rubah pilihan pada dropdown list kabupaten
    for (var i=0; i<data.length; i++)
      // alert(data[i]['kode_prov'] == this.state.entri_p_prov_val);
      if(data[i]['kode_prov'] == this.state.entri_p_prov_val)
          $("#entri-p-kab").append(
            "<option value="+ data[i]['kode_kab'] +">["+data[i]['kode_kab'] + "] " + data[i]['nama_kab'] + "</option>"
          );
    });
  }

  changeHandlerKab(childComponent) {
        this.setState({
              entri_p_kab_val: childComponent.target.value
        });
    }

  render() {
    return (
      <div id="container" class="col-lg-12">

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
