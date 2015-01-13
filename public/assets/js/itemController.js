$(function(){
	$destroy = $("#destroyItem");
		$destroy.click(function(){
			stock.utils.deleteItem();
		});
})