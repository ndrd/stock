/* main stocker event listener */
$(function () {
	$box = $("#box");
	$box.focus();
	var sort = location.href.split("?").pop().split("=").pop();

	stock.getItems($box.val(),sort);
	$list = $("list");
	/* section stocker */
	$box.keyup( function (e) {
		stock.getItems($(this).val());
	});



});