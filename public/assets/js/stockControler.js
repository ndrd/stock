/* main stocker event listener */
$(function () {
		$box = $("#box");

	if(localStorage.getItem("q") != null){
		console.log("Ok localStorage")
		$box.val(localStorage.getItem("q"));
	}

	$box.focus();
	var sort = location.href.split("?").pop().split("=").pop();

	stock.getItems($box.val(),sort);
	$list = $("list");
	/* section stocker */
	$box.keyup( function (e) {
		stock.getItems($(this).val());
		localStorage.setItem("q",$(this).val());
		history.pushState(null, null, "/stock?q=" + $(this).val());
	});



});