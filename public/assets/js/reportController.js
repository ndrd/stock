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


var graph = function(reports) {
  var data = reports.slice()
  var format = d3.time.format("%a %b %d %Y")
  var amountFn = function(d) { return d.amount }
  var dateFn = function(d) { return format.parse(d.created_at) }

  var x = d3.time.scale()
    .range([10, 280])
    .domain(d3.extent(data, dateFn))

  var y = d3.scale.linear()
    .range([180, 10])
    .domain(d3.extent(data, amountFn))
  
  var svg = d3.select("#reports").append("svg:svg")
  .attr("width", 300)
  .attr("height", 200)

  svg.selectAll("circle").data(data).enter()
   .append("svg:circle")
   .attr("r", 4)
   .attr("cx", function(d) { return x(dateFn(d)) })
   .attr("cy", function(d) { return y(amountFn(d)) }) 
}