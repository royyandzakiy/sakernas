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
        refresh: false
      };

      // alert(JSON.stringify(this.state));
  }

  // setupListener(e) {
  //   e.preventDefault();
  //
  // }

  componentDidMount() {

        // isi list provinsi
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

            //--- PERBARUI TABLE ENTRI-P
            $("#entri-p > tbody > tr").remove(); // remove rows

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

                      // generate-clickHandler
                      var entri_p = document.getElementById('form-entri-p-1'),rIndex; // entri_p di ekstrak & jadi listener
                      var form_entri_p_p1 = document.getElementById('form-entri-p-1'),rIndex; // FORM diubah

                      for (var i=0; i<entri_p.rows.length; i++) {
                        entri_p.rows[i].onclick = function() {
                              // form_entri_p_p1.cells[0].innerHTML = this.state.entri_p_sem_val;

                              // form_entri_p_p1.cells[1].innerHTML = this.state.entri_p_prov_val;
                              // form_entri_p_p1.cells[2].innerHTML = this.state.entri_p_kab_val;
                              // form_entri_p_p1.cells[3].innerHTML = this.cells[1].innerHTML;
                              // form_entri_p_p1.cells[4].innerHTML = this.cells[2].innerHTML;
                              // form_entri_p_p1.cells[5].innerHTML = this.cells[3].innerHTML;
                        };
                      }
                  }
                  this.setState({
                      refresh:true
                  },()=>{
                    this.setState({
                      refresh:false
                    });
                  });
            } else
                $("#entri-p > tbody").append(
                "<tr class='data'>"+
                  "<td colspan='6'>Tidak ada data yang sesuai</td>"+
                "</tr>");
        });

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

      <Modal refresh={this.state.refresh} semester={this.state.entri_p_sem_val} kode_prov={this.state.entri_p_prov_val} kode_kab={this.state.entri_p_kab_val} kode_kec={this.state.entri_p_kec_val} kode_desa={this.state.entri_p_desa_val} sls={this.state.entri_p_sls_val} nks={this.state.entri_p_nks_val} />

      </div>
    );
  }
}

export default Entri_p;
