$(function(){
	$date = $("#date");
	$range  =$("#range");

	var dates = $range.text().split("|");
	var html = "Del ";
	dates.forEach(function(d){
		m = new moment(d);
		html += m.format("LL");
		html += " a "
	});

	$range.text(html)

	$date.text(moment().format('LL'));

	stock.reports.showReport();
});