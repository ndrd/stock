$(function (e){

	$total = $("#total");
	$pay = $("#pay");
	$change = $("#change");
	$abort = $("#cancel");
	$saveTicket = $("#sold");
	$notice = $("#notice");

	$pay.keyup(function(e){
		var total = parseFloat($total.text());
		var pago = parseFloat($pay.val());
		if (pago >= total)
			$change.text(pago-total);
		else
			$change.text("0.0");
	});

	$pay.click(function(e){
		$(this).val("");
	});

	$abort.click(function(e){
		stock.toHtml.resetTicket();
		$total.text("0.0");
		$pay.val(0.0);
		$change.val(0.0)

	});

	

	$saveTicket.click(function(){
		HashTicket.init();
		$saving  = $.post("/tickets", HashTicket); 
		$saving.done(function(){
			console.log($saving);
			stock.$ticketList.empty();
			stock.toHtml.resetTicket();
			$total.text("0.0");
			$pay.val(0.0);
			$change.val(0.0);
			var fol = $saving.responseJSON;
			$notice.text("#" + fol.id+1);
		});
	});

});