save(e) {
    // save to dsrt x (gaperlu)
    // save to data_rt #hal1
    // save to data_art
        // #hal2 = #form-dsrt-4 > tbody > tr
        // .tab-content > div.art = hitung dengan iterasi
    console.log("save now");

    // buat referensi dari tiap tabel terkait


    // ambil data dari semua kolom terkait
    // post & update berdasarkan _id tiap data (id ada di)
    // ulangi utk data_rt, data_art

      // for (var i=0; i<form_entri_b5.rows.length; i++) {
      //   if (i > 0) {
      //   var _id = form_entri_b5.rows[i].cells[0].children[0].value;
      //   var id_user = '';
      //   var b3_r1a = $('#form-entri-p-2 #entri-p-form-b3_r1a').val();
      //   var b3_r1b = $('#form-entri-p-2 #entri-p-form-b3_r1b').val();

        // 1. get referemce ke tabel
        var form_data_rt = document.getElementById('form-dsrt'),rIndex;
        var form_data_art = document.getElementById('hal2'),rIndex;

        console.log(form_data_rt.rows[1].cells[2].children[0].value);
        console.log(form_data_rt.rows[1].cells[2].children[0].value);

        // var _id_rt = '';
        var _id_art = '';


        ///*

        // 2. siapkan data
        var temp_data_rt = {
          kode_prov:'',
          kode_kab:'',
          semester:'',
          nks:'',
          no_dsrt:'',
          status_dok:'',
          id_user:'',
          b1_r9:'',
          b1_r10:'',
          b1_r11:'',
          b2_r1:'',
          b2_r2:'',
          b3_r1b:'',
          b3_r1a_tl:'',
          b3_r1a_bl:'',
          b3_r1a_th:'',
          b3_r1a_ttd:'',
          b3_r2b:'',
          b3_r2a_tl:'',
          b3_r2a_bl:'',
          b3_r2a_th:'',
          b3_r2a_ttd:'',
          b6_rcat:'',
        }

        // for (var i=0; i<jumalh_row_hal2; i++)
        var temp_data_art = {
          // "kode_prov":this.state.entri_p_prov_val,
          // "kode_kab":this.state.entri_p_kab_val,
          // "kode_kec":form_entri_p_1.rows[3].cells[1].innerHTML,
          // "kode_desa":form_entri_p_1.rows[4].cells[1].innerHTML,
          // "nks":form_entri_p_1.rows[6].cells[1].innerHTML,
          kode_prov:'',
          kode_kab:'',
          semester:'',
          nks:'',
          no_dsrt:'',
          id_art:'',

          b4_k2:'',
          b4_k3:'',
          b4_k4:'',
          b4_k5_bl:'',
          b4_k5_th:'',
          b4_k6:'',
          b4_k7:'',
          b4_k8:'',

          b5_rnama:'',
          b5_rinfo:'',
          b5_r1a:'',
          b5_r1b:'',
          b5_r1c:'',
          b5_r1d:'',
          b5_r1e:'',
          b5_r2a:'',
          b5_r2b:'',
          b5_r3a:'',
          b5_r3b:'',
          b5_r4a:'',
          b5_r4b:'',
          b5_r4c:'',
          b5_r4d:'',
          b5_r4e:'',
          b5_r4f:'',
          b5_r5a1:'',
          b5_r5a2:'',
          b5_r5a3:'',
          b5_r5a4:'',
          b5_r5b:'',
          b5_r6:'',
          b5_r7a:'',
          b5_r7b:'',
          b5_r8:'',
          b5_r8l:'',
          b5_r23:'',
          b5_r24:'',
        }

          // 3. save
          // if(0) {
                // data_rt = sekali aja
                if (_id_rt == 'new'){
                      $.post("https://sakernas-api.herokuapp.com/data-rt/add",
                          temp_data_rt,
                          function(_data, status) {
                            console.log(_data);
                          });
                } else {
                  var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://sakernas-api.herokuapp.com/data-rt/update/"+_id_rt,
                        "method": "PUT",
                        "headers": {
                        "content-type": "application/x-www-form-urlencoded",
                        "cache-control": "no-cache",
                        "postman-token": "979f6bf0-2751-c970-018d-e5b138487bec"
                        },
                        "data": temp_data_rt
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                    });

                // data_art = sejumlah hal2_row_length
                if (_id_art == 'new'){
                      $.post("https://sakernas-api.herokuapp.com/data_art/add",
                          temp_data_art,
                          function(_data, status) {
                            console.log(_data);
                          });
                } else {
                  var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://sakernas-api.herokuapp.com/data_art/update/"+_id_art,
                        "method": "PUT",
                        "headers": {
                        "content-type": "application/x-www-form-urlencoded",
                        "cache-control": "no-cache",
                        "postman-token": "979f6bf0-2751-c970-018d-e5b138487bec"
                        },
                        "data": temp_data_art
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response);
                    });
          }

      //}
      //*/
    alert('Data diperbaharui!');
    // this.refresh();
}
