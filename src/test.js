import React, { Component } from 'react';
import $ from 'jquery';
//pages

function TableItem(props) {
  return(
    <tr>
        <td className="nama">{props.nama}</td>
        <td className="jurusan">{props.jurusan}</td>
        <td className="nim">{props.nim}</td>
    </tr>
  );
}

function ItemList(props) {
  alert(props.data);
  const data = props.data;
  return (
    <tr>
        {data.map((data) =>
            <TableItem
                nama={data['nama']}
                jurusan={data['jurusan']}
                nim={data['nim']}
            />
        )}
    </tr>
  );
}

// ----Test
class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        {
          nama: 'Royyan',
          jurusan: 'IF',
          nim: '13515123',
        },
        {
          nama: 'Azis',
          jurusan: 'IF',
          nim: '13515001',
        },
      ]
    }

    this.selectTableController(); // working fine
    ItemList(this.state.data);

  }


  // selects a row of a table
  selectTableController() {
      $(document).ready(function() {
          $("#test-table tr").click(function () {
              $('.selected').removeClass('selected');
              $(this).addClass("selected");
              var product = $('.nama',this).html();
              var infRate =$('.jurusan',this).html();
              var note =$('.nim',this).html();
              alert('data: ' + product +','+ infRate+','+ note);
          });
      });
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
                 <td class="nim">
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
                 <td class="nim">
                    2
                 </td>
             </tr>
         </tbody>
     </table>

     <ItemList data={this.state.data} />
      </div>
    );
  }
}

export default Test;
