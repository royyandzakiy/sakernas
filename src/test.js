import React, { Component } from 'react';
import $ from 'jquery';
//pages

// ----Test
class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      table_data: {
      }
    }

    this.select_table(); // working fine

  }


  // selects a row of a table
  select_table() {
      $(document).ready(function() {
          $("#test-table tr").click(function () {
              $('.selected').removeClass('selected');
              $(this).addClass("selected");
              var product = $('.nama',this).html();
              var infRate =$('.jurusan',this).html();
              var note =$('.kelas',this).html();
              alert('data: ' + product +','+ infRate+','+ note);
          });
      });
  }

  tableClickController () {
    alert($("#table-test tr").length);
  }

  generateTable() {
    $(document).ready(
      $("#table-test > tbody").append (
        "<tr>"+
          "<td>this.state.table_data['nama']</td>"+
          "<td>this.state.table_data['jurusan']</td>"+
          "<td>this.state.table_data['nim']</td>"+
        "</tr>"
      )
  );
  }

  generateData() {
    // ganti dengan ajax call (retrieve)
    var data = {
      nama: 'Royyan',
      jurusan: 'Informatika',
      nim: '13515123'
    };

    // lakukan setState setelah ajax sukses
    this.setState ({
      table_data: data
    });

  }

  render() {
    return (
      <div>
      <h2>SUDAH TERUJI OLEH ANAK ITB</h2>
     <table class="table table-hover table-bordered" id="test-table">
         <tbody>
             <tr>
                 <td class="nama">
                    Royyan
                 </td>
                 <td class="jurusan">
                    Teknik Informatika
                 </td>
                 <td class="kelas">
                    3
                 </td>
             </tr>
             <tr>
                 <td class="nama">
                    Azis
                 </td>
                 <td class="jurusan">
                    Teknik Informatika
                 </td>
                 <td class="kelas">
                    2
                 </td>
             </tr>
         </tbody>
     </table>
      </div>
    );
  }
}

export default Test;
