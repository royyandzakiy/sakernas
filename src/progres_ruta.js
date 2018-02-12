import React, { Component } from 'react';
import './css/progress_ruta.css';
import $ from 'jquery';

class Progres_ruta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prov_list: {},
      prov_val: '00',
      kab_list: {},
      kab_val: '01',
      kec_list: {},
      kec_val: '',
      report_val: 'pemutakhiran',
      tabel: {}
    };

    this.changeProv = this.changeProv.bind(this);
    this.changeKab = this.changeKab.bind(this);
    this.changeReport = this.changeReport.bind(this);
    this.refresh = this.refresh.bind(this);

  }

  componentDidMount() {

    $.get("http://localhost:8002/master-prov",
        {},
        function(data, status) {
            // alert(JSON.stringify(data));
            $("#monitor-prov > option").remove();
            if (data.length != 0)
                for (var i=0; i<data.length; i++) {
                  $("#monitor-prov").append(
                    "<option " + (i==0 ? "selected" : "") +
                    " value="+ data[i]['kode_prov'] +">["+data[i]['kode_prov'] + "] " + data[i]['nama_prov'] + "</option>"
                  );
                }

            this.setState({
              prov_list: data,
              prov_val: data[0]['kode_prov']
            });
        }.bind(this));

        $.get("http://localhost:8002/master-kab",
            {kode_prov: this.state.prov_val},
            function(data, status) {
                // alert(JSON.stringify(data));
                $("#monitor-kab > option").remove();
                if (data.length != 0)
                    for (var i=0; i<data.length; i++) {
                      if(data[i]['kode_prov'] == this.state.prov_val)
                          $("#monitor-kab").append(
                            "<option value="+ data[i]['kode_kab'] +">["+data[i]['kode_kab'] + "] " + data[i]['nama_kab'] + "</option>"
                          );
                    }

                    this.setState({
                      kab_list: data,
                      kab_val: data[0]['kode_kab']
                    });
            }.bind(this));

            $.get("http://localhost:8002/master-kec",
                {},
                function(data, status) {
                    // alert(JSON.stringify(data));

                    this.setState({
                      kec_list: data,
                      kec_val: data[0]['kode_kec']
                    });
                }.bind(this));

            this.setState({
              report_val: 'pemutakhiran'
            });
  }

  refresh(e) {
    e.preventDefault();


    var report = this.state.report_val;
    var query = {
      kode_kab: this.state.kab_val,
      kode_prov: this.state.prov_val,
    }

    var tableRef = $("#App-table > tbody");

    $.get("http://localhost:8002/" + (report == 'Pemutakhiran' ? "pemutakhiran/" : "data-rt/" ),
        query,
        function(data, status) {
            $("#App-table > tbody > tr").remove();
            if (data.length != 0)
                this.setState({
                    tabel: data
                }, () => {
                  var dokBlank, dokClean, dokError, dokTotal, nksTotal, kecTotal = 0;

                  var kec_list = [];
                  var kode_kec_list = [];
                  var temp = {};

                  // isi kode_kec_list & kec_list
                  for (var i=0; i<data.length; i++) {
                      if (!kode_kec_list.includes(data[i]['kode_kec'])) {
                          kode_kec_list.push(data[i]['kode_kec']);

                          temp = {
                            kode_kec:'',
                            nama_kec:'',
                            dokClean:0,
                            dokBlank:0,
                            dokError:0
                          };

                          temp['kode_kec'] = data[i]['kode_kec'];
                          temp['nama_kec'] = data[i]['nama_kec'];
                          // alert("temp: "+JSON.stringify(temp));
                          kec_list.push(temp);
                      }

                      var indexOfKec = kode_kec_list.indexOf(data[i]['kode_kec']);
                      if (data[i]['status_dok'].toLowerCase()  == 'c')
                          kec_list[indexOfKec]['dokClean']++;
                      else if (data[i]['status_dok'].toLowerCase()  == 'b')
                          kec_list[indexOfKec]['dokBlank']++;
                      else if (data[i]['status_dok'].toLowerCase()  == 'e')
                          kec_list[indexOfKec]['dokError']++;
                  }



                      for (var i=0; i<kode_kec_list.length; i++) {
                          dokBlank, dokClean, dokError, dokTotal, nksTotal, kecTotal = 0;

                          dokClean = kec_list[i]['dokClean'];
                          dokError = kec_list[i]['dokError'];
                          dokBlank = kec_list[i]['dokBlank'];
                          dokTotal = dokBlank + dokClean + dokError;
                          nksTotal = '-';
                          kecTotal = kode_kec_list.length;

                          var nama_prov = $('#monitor-prov option:selected').text();
                          var nama_kab = $('#monitor-kab option:selected').text();

                          var indexOfKec = this.state.kec_list.map(function(d) { return d['kode_kec']; }).indexOf(kode_kec_list[i]);
                          // alert(JSON.stringify(this.state.kec_list));

                          // jika !pemutakhiran => tidak ada nama kecamatan
                          var nama_kec = (report == 'Pemutakhiran' ? this.state.kec_list[indexOfKec]['nama_kec'] : '-');
                          tableRef.append(
                              "<tr>"+
                                  "<td>"+"000000"+"</td>"+
                                  "<td>"+nama_prov+"</td>"+
                                  "<td>"+nama_kab+"</td>"+
                                  "<td>"+nama_kec+"</td>"+
                                  "<td>"+dokBlank+"</td>"+
                                  "<td>"+(dokBlank/dokTotal)*100+"%</td>"+
                                  "<td>"+dokClean+"</td>"+
                                  "<td>"+(dokClean/dokTotal)*100+"%</td>"+
                                  "<td>"+dokError+"</td>"+
                                  "<td>"+(dokError/dokTotal)*100+"%</td>"+
                                  "<td>"+dokTotal+"</td>"+
                                  "<td>"+nksTotal+"</td>"+
                              "</tr>"
                          );
                      }
                });
              else
                  tableRef.append(
                  "<tr class='data'>"+
                    "<td colspan='12'>Tidak ada data yang sesuai</td>"+
                  "</tr>");
        }.bind(this));
  }

  changeReport(event) {
    this.setState({
      report_val:event.target.value
    }, () => {
    });
  }

  changeKab(event) {
    this.setState({
      kab_val:event.target.value
    });
  }

  changeProv(event) {
    this.setState({
      prov_val:event.target.value
    }, () => {

    $("#monitor-kab > option").remove();
    var data = this.state.kab_list;

    // rubah pilihan pada dropdown list kabupaten
    for (var i=0; i<data.length; i++)
      if(data[i]['kode_prov'] == this.state.prov_val)
          $("#monitor-kab").append(
            "<option value="+ data[i]['kode_kab'] +">["+data[i]['kode_kab'] + "] " + data[i]['nama_kab'] + "</option>"
          );
    });
  }

  render() {
    return (
      <div className="App">
        <div id="main" class="container main">
        <div id="App-pilih" class="col-lg-8">
        <table >
            <tbody>
                <tr>
                    <td>Jenis Kegiatan: </td>
                    <td>
                    <select id="jenis-kegiatan" class="form-control">
                        <option>Sakernas 2017</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Provinsi: </td>
                    <td>
                    <select class="form-control" id="monitor-prov" onChange={this.changeProv.bind(this)} value={this.state.prov_value}>
                        <option>-</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Kab/Kota: </td>
                    <td>
                    <select class="form-control" id="monitor-kab" onChange={this.changeKab.bind(this)} value={this.state.kab_value}>
                        <option>-</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td>Report: </td>
                    <td>
                    <select class="form-control" id="monitor-report" onChange={this.changeReport.bind(this)} value={this.state.report_value}>
                        <option>Pemutakhiran</option>
                        <option>Rumah Tangga</option>
                    </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <button id="monitor-Refresh" onClick={this.refresh}>Refresh</button>
        </div>


        <div>
            <table id="App-table" class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>
                            Kode Wilayah
                        </th>
                        <th>
                            Nama Prov
                        </th>
                        <th>
                            Nama Kab
                        </th>
                        <th>
                            Nama Kec
                        </th>
                        <th>
                            DokBlank
                        </th>
                        <th>
                            PersenBlank
                        </th>
                        <th>
                            DokClean
                        </th>
                        <th>
                            PersenClean
                        </th>
                        <th>
                            DokError
                        </th>
                        <th>
                            PersenError
                        </th>
                        <th>
                            Total
                        </th>
                        <th>
                            TotalNKS
                        </th>
                    </tr>
                </thead>
                <tbody>
                  <tr class='data'>
                    <td colspan='12'>Tekan Refresh</td>
                  </tr>
                </tbody>
            </table>
        </div>
        </div>
      </div>
    );
  }
}

export default Progres_ruta;
