var load = function() {
	$("#box").keypress(function(e){
			if(e.keyCode == 13 && $(this).val().length > 0) {
				showDetails($(this).serialize());
				
			}
		});
	
}

var showDetails =  function(code) {
	$.post('kaiser.php', code, function(data) {
		$("#details").append(cardItem(data));
	},  "json");
	
}

var cardItem = function(data) {
	if (data != null) {
		$("#box").val("");
		return data +  "<br>";
	} else {
		alert("mensaje de superacion personal aqui");
	}

}


