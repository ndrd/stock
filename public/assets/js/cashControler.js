/* controler for the cash part of the stock */
$(function () {
	$trigger = $("#toogleSearch");
	$box = $("#box");
	$dateHolder = $("#date");
	$sugestionsHolder = $("#results");

	$box.focus();

	/* toogle button search action */
	$trigger.click( function (e) {
		stock.searchON = !stock.searchON;
		 $( this ).toggleClass( "searchOn" );
		 $sugestionsHolder.toggle();

		 if( stock.searchON ) {
		 	try {
		 		stock.instantSearch($box.val());
		 	} catch (err){
		 		alert(e.message);	
		 	}
		}
		$box.focus();
	});

	/* call to the instant search */
	$box.keyup(function(e){
		if(stock.searchON) {
			stock.instantSearch($(this).val());
		} else {
			if(e.keyCode == 13 && $(this).val().length > 0) {
				stock.getItem($(this).val());
				$(this).val("");
			}
		}
	});

	/* clear the search box */
	$box.click(function(){
		$(this).val("");
	});

	$sugestionsHolder.delegate("li", "click", function(){
	 	var data = $(this).attr("data");
	 	var item = JSON.parse(data);
	 	stock.ticket.add(item);
	 	// must end this time
	 	$("#list-items").append(stock.toHtml._item(item));
		$("#total").text("$" + window.ticket.total);	 	
	 	window.modeSearch = !window.modeSearch;
		 $("#toogleSearch").toggleClass( "searchOn" );
		 $("#results").toggle();
		 $("#box").val("");
		 $("#box").focus();	
	});
});