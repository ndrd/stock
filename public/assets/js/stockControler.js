/* main stocker event listener */
$(function () {
	stock.getItems();
	$list = $("list");
	/* section stocker */
	$("#box").focus();
	$("#box").keyup( function (e) {
		stock.getItems($(this).val());
	});

	$list.delegate("a","click",function(){
		var data = $(this).attr("data-item");
		data = JSON.parse(data);
		$("#detail.title").text(data.description);
		console.log(data);
	});

});