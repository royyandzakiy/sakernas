import React, { Component } from 'react';
import Modal from './modal';
// table stuff
import $ from 'jquery';

// ----MAIN APP
class Entri_p extends Component {

  constructor(props) {
      super(props);
      this.state = {
        entri_p_sem_val: '',
        entri_p_kab_list: {},
        entri_p_kab_val: '',
        entri_p_prov_list: {},
        entri_p_prov_val: '',
      };

      this.changeHandlerProv = this.changeHandlerProv.bind(this);
      this.changeHandlerKab = this.changeHandlerKab.bind(this);
      this.changeHandlerSem = this.changeHandlerSem.bind(this);
      this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    var query = {}
        $.get("http://localhost:8002/master-prov",
            query,
            function(_data, status) {
                // alert(JSON.stringify(_data)); //debug

                this.setState({
                  entri_p_prov_list: _data,
                  entri_p_prov_val: _data[0]['kode_prov']
                });

                var data = this.state.entri_p_prov_list;

                for (var i=0; i<data.length; i++) {
                  $("#entri-p-prov").append(
                    "<option value="+data[i]['kode_prov']+">["+data[i]['kode_prov']+"] "+data[i]['nama_prov']+"</option>"
                  );
                }
            }.bind(this));


        $.get("http://localhost:8002/master-kab",
            query,
            function(_data, status) {
                // alert(JSON.stringify(_data)); //debug

                this.setState({
                    entri_p_kab_list: _data,
                    entri_p_kab_val: _data[0]['kode_kab']
                });

                var data = this.state.entri_p_kab_list;

                for (var i=0; i<data.length; i++) {
                  $("#entri-p-kab").append(
                    "<option value="+data[i]['kode_kab']+">["+data[i]['kode_kab']+"] "+data[i]['nama_kab']+"</option>"
                  );
                }

            }.bind(this));
  }

  //--- function: refresh
  refresh(e) {
    e.preventDefault();

    var entri_p_sem_val = $('#entri-p-sem option:selected').val();

    var query = {
      entri_p_sem:entri_p_sem_val,
      entri_p_prov:this.state.entri_p_prov_val,
      entri_p_kab:this.state.entri_p_kab_val
    }

    // alert("query_kab: " +JSON.stringify(this.state.entri_p_kab_val));
    // alert("query: " +JSON.stringify(query));

    $.get("http://localhost:8002/pemutakhiran",
        query,
        function(data, status) {
            // alert(JSON.stringify(data)); //debug

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

  changeHandlerProv(childComponent) {
        // alert(childComponent.target.value);
        // var entri_p_prov = $('#entri-p-prov option:selected').val();
        this.setState({
              entri_p_prov_val: childComponent.target.value
        });
    }

  changeHandlerKab(childComponent) {
        // alert(childComponent.target.value);
        // var entri_p_kab = $('#entri-p-kab option:selected').val();
        this.setState({
              entri_p_kab_val: childComponent.target.value
        });
    }

  render() {
    return (
      <div id="container" class="col-lg-12">

      <div class="form-group col-lg-4" >
        <label for="entri-p-sem">Semester:</label>
        <select class="form-control" id="entri-p-sem" onChange={this.changeHandlerSem}>
          <option>1</option>
          <option>2</option>
        </select>

        <label for="entri-p-prov">Provinsi:</label>
        <select class="form-control" id="entri-p-prov" onChange={this.changeHandlerProv}>
        </select>

        <label for="entri-p-kab">Kabupaten:</label>
        <select class="form-control" id="entri-p-kab" onChange={this.changeHandlerKab}>
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
