window.modeSearch = false;
window.apiUrl = "kaiser.php";
window.user = null;
window.tiket = null;

var styles =  function() {
	$( "nav li" ).click().addClass( "selected" );
}

var loadCore = function() {
		console.log("Core loader");
		$("#date").text(moment().format('LL'));
		$("#toogleSearch").click(function(){
			window.modeSearch = !window.modeSearch;
			 $( this ).toggleClass( "searchOn" );
			 $("#results").toggle();
			 if(window.modeSearch) {
				 $.getJSON( apiUrl, {
				    search: $("#box").val()
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
	var posting = $.post('kaiser.php' , code );
	posting.done(function(d){
	 	if(d.status == 0) {
			alert("Elemento no encontrado");
			return null;
		} else {
			d = d.item;
			window.item = new Item(d[0],d[1],d[2],d[3],d[4],d[5]);
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


var parseResults =  function(data, container) {
	data = data.data
	$("#" + container).empty();
	for(i = 0; i < data.length; i++){
		$("#"+container).append(itemyze(data[i]));
		}
}

var parseResults2 =  function(data, container) {
	data = data.data
	$("#" + container).empty();
	for(i = 0; i < data.length; i++){
		$("#"+container).append(itemDetailToHtml(makeItem(data[i]),i));
		}
}

var makeItem =  function(d) {
	return new Item(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7]);
}

var itemyze =  function(e) {
	return "<li data='" + JSON.stringify(e)+ "'><span class='description'>" +e[2] +"</span><strong class='sale'>" + e[3]+"</span></li>"
}


var getUser = function() {
	$.getJSON( apiUrl, {
		userInfo: true
	})
	.done(function( d) {
		window.user = new User(d[6],d[1],d[3],d[10]);
		newTicket();
		drawUser(window.user);
		
	});

}


var newTicket = function() {
	if(window.user instanceof User) {
		window.ticket =  new Ticket(window.user);
	} else {
		alert("No se pudo construir un nuevo ticket");
	}
}

var drawUser =  function(user) {
	$("#user-name").empty();
	$("#user-name").text(user.name);
	$("#profile-picture").attr("src",user.miniphoto);
}

var itemToHtml =  function(item,i) {
	return "<a data-item='" + JSON.stringify(item) +"'><div class='item'><span class='number'>"+ i + '</span>'+
      '<span class="code">'+ item.code+ '</span>'+
      '<span class="description">' + item.description +'</span>'+
      '<span class="saleI">' + item.sale +'</span></div></a>';
}

prettyTime = moment;
prettyTime.lang("es");

var itemDetailToHtml =  function(item,i) {
	return "<a data-item='" + JSON.stringify(item) +"'><div class='little item'><span class='number'>"+ i + '</span>'+
      '<span class="code">'+ item.code+ '</span>'+
      '<span class="description">' + item.description +'</span>'+
      '<span class="saleI">' + item.sale +'</span>' +
      '<span class="stock">' + item.stock +'</span>'+
      '<span class="upadte">' + prettyTime(item.update).fromNow() +'</span></div></a>';
}


var changeSelected =  function(target) {
	 l = $("#nav");
	 l = l.find("li");
	 $.each(l,function(e,v) {
	 	$(v).find("a").first().removeClass("active");

	 });
	 $(target).toggleClass("active");
}


var getPage =  function(target, canvas) {
	$.ajax("views/error.stock")
	.done(function(d){
		$("#content").empty();
		$("#content").append(d);
	});
}


var getReport =  function() {
	var call = $.post("kaiser.php",{report:""})
}