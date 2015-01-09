/* controler for the cash part of the stock */
$(function () {
	$trigger = $("#toogleSearch");
	$box = $("#box");
	$dateHolder = $("#date");
	$sugestionsHolder = $("#results");
	$ticketList = $("#list-items")

	$box.focus();

	/* toogle button search action */
	$trigger.click( function (e) {
		stock.searchON = !stock.searchON;
		 $( this ).toggleClass( "searchOn" );
		 $sugestionsHolder.toggle('slow');

		 if( stock.searchON && $box.val().length > 0 ) {
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

	/* controler for the suggestions search */
	$sugestionsHolder.delegate("li", "click", function(){
	 	var data = $(this).attr("data");
	 	var item = JSON.parse(data);
	 	/* sold item */
	 	stock.ticket.add(item);
	 	$ticketList.append(stock.toHtml._item(item));
	 	stock.ticketUI.update();

	 	stock.searchON = !stock.searchON;
		$trigger.toggleClass( "searchOn" );
		$sugestionsHolder.hide('slow');
		$box.val("");
		$box.focus();	
	});
});