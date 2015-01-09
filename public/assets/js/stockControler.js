/* main stocker event listener */
$(function () {
	$box = $("#box");
	$box.focus();

	stock.getItems($box.val(),'last_check');
	$list = $("list");
	/* section stocker */
	$box.keyup( function (e) {
		stock.getItems($(this).val());
	});

	$list.delegate("a","click",function(){
		var data = $(this).attr("data-item");
		data = JSON.parse(data);
		$("#detail.title").text(data.description);
		console.log(data);
	});

});