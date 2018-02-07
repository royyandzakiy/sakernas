var json = [{
		'nama': "Royyan",
        'usia': 12
	},
    {
		'nama': "Mantap",
        'usia': 12
	},
    {
		'nama': "Jiwa",
        'usia': 12
	}];

$(document).ready(function(){
    for (var i=0; i<json.length; i++) {
    	$("#list").append("<li>"+ json[i]['nama'] +"</li>");
    }
});
