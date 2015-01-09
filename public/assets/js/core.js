$(function(){
	
	
	  $("nav").find("a").each(function(k,v){ 
      loc = $(v).attr("href");
      $(v).removeClass("active")
      if(loc === location.pathname.split("/").pop()) {
        $(v).addClass("active");
        return;
      }
    });
});

window.modeSearch = false;
window.apiUrl = "search";
window.user = null;
window.tiket = null;

var styles =  function() {
	$( "nav li" ).click().addClass( "selected" );
}

var loadCore = function() {
		console.log("Core loader");
		$("#date").text(moment().format('LL'));

		$("#toogleSearch").click(function(){
			console.log("busqueda")
			window.modeSearch = !window.modeSearch;
			 $( this ).toggleClass( "searchOn" );
			 $("#results").toggle();
			 if(window.modeSearch) {
				 $.getJSON( apiUrl, {
				    q: $("#box").val()
				    })
				   .done(function( data ) {
				     	parseResults(data,"results");
				   });
			}
			$("#box").focus();
			 
		});

		$("#box").click(function(){
			$(this).val("");
		});

		$("#box").keyup(function(e){
			if(window.modeSearch) {
				$.getJSON( apiUrl, {
			    	search: $(this).val()
			    })
			   .done(function( data ) {
			     	parseResults(data,"results");
			    });
			} else {
				if(e.keyCode == 13 && $(this).val().length > 0) {
					item = getItem(($(this).serialize()));
					console.log(item);
					$(this).val("");
				}
			}
		});

		$("#stockSearch").keyup(function(e){
			$.getJSON( apiUrl, {
			    	search: $(this).val(),
			    	limit : 25
			    })
			   .done(function( data ) {
			     	parseResults2(data,"list");
			    });
		});

		 $("#results").delegate("li", "click", function(){
		 	var data = $(this).attr("data");
		 	data = JSON.parse(data);
		 	item = makeItem(data);
		 	window.ticket.add(item);
		 	$("#list-items").append(itemToHtml(window.item, window.ticket.saledItems));
			$("#total").text("$" + window.ticket.total);	 	
		 	window.modeSearch = !window.modeSearch;
			 $("#toogleSearch").toggleClass( "searchOn" );
			 $("#results").toggle();
			 $("#box").val("");
			 $("#box").focus();	

	 	
	 });

	$("#nav").delegate("a", "click", function(){
		changeSelected($(this));
	 	
	 });

	$("#list-items").delegate("a","click",function(){
		$("#alert").toggle('slow');
		var data = $(this).attr("data-item");
		data = JSON.parse(data);
		$("#detail.title").text(data.description);
		console.log(data);
	});

	$("#list").delegate("a","click",function(){
		$("#alert").toggle('slow');
		var data = $(this).attr("data-item");
		data = JSON.parse(data);
		$("#detail.title").text(data.description);
		console.log(data);
	});

	$("#close").click(function(){
		$("#alert").hide();
	});

	$("#sold").click(function(){
		change = parseFloat($("#pay").val()) - window.ticket.total;
		$("#change").text(change);
		$("#pay").val(window.ticket.total);
		$("#pay").show();
		$("#pay").focus();

	});

	$("#pay").keyup(function(e){
			if(e.keyCode == 13 && $(this).val().length > 0) {
				$("#pay").hide();
				$("#change").hide();
				$("#total").text("0.0");
				$("#list-items").empty();
				$("#change").text("");
				checkTicket();
			} else {
				change = parseFloat($("#pay").val()) - window.ticket.total;
				$("#change").text(change);

			}
			
		});

}




var  checkTicket = function() {
	if (window.ticket != null) {
		t =  new TicketDetail(ticket);
		saveTicket(t);
	}
	window.ticket =  new Ticket(window.user);
}


function processData(response, urlPath){
     document.title = response.pageTitle;
     window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
 }

 function Response(html, title) {
 	this.html = html;
 	this.title = title;
 }
 
window.item = null;

var getItem =  function(code) {
	console.log(code)
	var posting = $.getJSON('details' , code );
	posting.done(function(d){
	 	if(d == null) {
			alert("Elemento no encontrado");
			return null;
		} else {
			console.log(d);
			window.item = d;
			window.ticket.add(window.item);
			$("#list-items").append(itemToHtml(window.item, window.ticket.saledItems));
			$("#total").text(window.ticket.total);	 	
		}
	});
}

var saveTicket =  function(ticket) {
	var posting = $.post('kaiser.php' , ticket );
	posting.done(function(d){
	 	alert("Ticket guardado");	
	});
}


