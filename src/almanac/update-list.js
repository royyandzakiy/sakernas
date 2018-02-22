// function: edit
edit(e) {
  e.preventDefault();

  var _petugas_lap_sem = $('#petugas-lap-sem option:selected').val();

  $.post("https://sakernas-api.herokuapp.com/petugas_lap",
      {
        petugas_lap_kab:_petugas_lap_kab
      },
      function(data, status) {
          alert(JSON.stringify(data)); //debug

          // remove rows
          $("#petugas-lap > tbody > tr").remove();

          // generate rows
          if (data.length != 0)
              for (var i=0; i<data.length; i++) {
                $("#petugas-lap > tbody").append(
                "<tr class='form-data' onclick=\"document.location = 'form-petugas-lap.html';\">"+
                  "<td>"+ (Number(i)+1).toString() +"</td><td>"+
                  data[i]['kode_petugas'] + "</td><td>" +
                  data[i]['nama'] + "</td><td>" +
                  data[i]['no_telp'] + "</td><td>" +
                  data[i]['jabatan_petugas'] + "</td>" +
                "</tr>");

                $(".edit").css("display","none");
                }
          else
              $("#petugas-lap > tbody").append(
              "<tr class='data'>"+
                "<td colspan='6'>Tidak ada data yang sesuai</td>"+
              "</tr>");
      });

}
