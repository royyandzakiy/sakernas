import React, { Component } from 'react';
// table stuff
import $ from 'jquery';

// ----MAIN APP
class Account extends Component {

  constructor(props) {
      super(props);
    }

  componentDidMount() {
      // get _id of logged USER
      var _id = '5a796a04734d1d0828bccbb5'; // change with logged in user

      $("#user-table > tbody > tr").remove();

      $.get("http://localhost:8002/user/" + _id,
          {},
          function(data, status) {
          // COUNT things
          // alert(JSON.stringify(data));

            if(data.totalData == 0) {
              $("#user-table > tbody").append(
                "<tr><td>Error, Data not found</td></tr>"
              );
            } else {
              $("#user-table > tbody").append(
                "<tr>"+
                    "<td>User ID: </td>"+
                    "<td>"+data.id_user+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>Provinsi: </td>"+
                    "<td>"+data.kode_prov+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>Kab/Kota: </td>"+
                    "<td>"+data.kode_kab+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>Username: </td>"+
                    "<td>"+data.username+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>Password: </td>"+
                    "<td>******"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>Name: </td>"+
                    "<td>"+data.realname+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>User Level: </td>"+
                    "<td>"+data.userlevel+
                    "</td>"+
                "</tr>"
              );
            }
      });
  }

  render() {
    return (
      <div id="container" class="col-lg-6 col-lg-offset-3 main">

      <h3>Account</h3>

      <table class="table table-bordered" id="user-table">
          <tbody>
              <tr>
                  <td>User ID: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>Provinsi: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>Kab/Kota: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>Username: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>Password: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>Name: </td>
                  <td>
                  </td>
              </tr>
              <tr>
                  <td>User Level: </td>
                  <td>
                  </td>
              </tr>
          </tbody>
      </table>

      </div>
    );
  }
}

export default Account;
