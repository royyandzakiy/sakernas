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

// get data: table
$.ajax(set_settings("https://sakernas-api.herokuapp.com/pemutakhiran")).done(function (_data) {
    var data = _data;
    console.log("data_pemutakhiran: " + JSON.stringify(data)); // debug

      for (var i=0; i<data.length; i++) {
        $("#entri-p > tbody").append(
        "<a href='#'><tr class='data'>"+
          "<td>"+ (Number(i)+1).toString() +"</td><td>"+
          data[i]['kode_kec'] + "</td><td>" +
          data[i]['kode_desa'] + "</td><td>" +
          data[i]['nks'] + "</td><td>" +
          data[i]['sls'] + "</td><td>" +
          data[i]['status_dok'] + "</td>" +
        "</tr></a><tr class='edit'>"+
          "<td>"+ (Number(i)+1).toString() +"</td><td>"+
          "<input type=\"text\" value="+ data[i]['kode_kec'] +" />" + "</td><td>" +
          "<input type=\"text\" value="+ data[i]['kode_desa'] +" />" + "</td><td>" +
          "<input type=\"text\" value="+ data[i]['nks'] +" />" + "</td><td>" +
          "<input type=\"text\" value="+ data[i]['sls'] +" />" + "</td><td>" +
          "<input type=\"text\" value="+ data[i]['status_dok'] +" />" + "</td>" +
        "</tr>");

        $(".edit").css("display","none");
        }

});
