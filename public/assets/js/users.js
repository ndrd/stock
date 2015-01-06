window.user = {};
window.cover = {};

var getData =  function(url) {
	graph = "http://graph.facebook.com/";
	cover = "?fields=cover";
	photo = "/picture?type=large";
	data = url.split("/");
	if(data[0] != "https:") {
		alert("URL invalida");
		return;
	} else {
		username = data[3].split("?");
		username = username[0];

		$.get( graph + username, function( data ) {
	  		window.user = data;
	  		window.user.fb = url;
	  		window.user.photo = graph + username + photo;
		}) .done(function() {
			$.get(graph + username + cover, function( d ) {
				window.cover = d;
			}).done(function(){
				window.user.cover = window.cover.cover.source;
				console.log(user);
			});
		   		publish();
		  });

		

	
		
	}
}

var publish = function() {
	if(window.user) {
		$("#profile").attr("src",window.user.photo);
		$("#name").empty();
		$("#name").append(window.user.name);
	}
}

var load = function() {
	$("#save").click(function(){
		save();
	});
	$("#go").click(function(){
		getData($("#url").val());
	});
	$("#check").click(function(){
		login($("#login").val(),$("#pswd").val())
	});


	
}

var save =  function() {
	if (window.user != null) {
		window.user.range = $("#isAdmin").val();
		passMatch = ($("#pswd").val() === $("#pswd2").val() && $("#pswd").val().length > 5);
		if(!passMatch) {
			alert("Las contraseñas no coinciden D:");
			return;
		} else {
			window.user.secret = $("#pswd").val();
			window.user.rank = 0;
			$.post('../kaiser.php', user, function(data) {
				console.log(data);
				console.log(data.status);
				if(data.status == "ok") {
					clean();
					alert("Hecho");
					window.location.href = "/";
				} else if (data.status = "exist") {
					alert("EL usuario ya existe");
				} else {
					alert("nein");
					clean();
				}
			});
		}

	} else {
		alert("Ingresa una url para anlizar al usuario");
	}

}


var clean =  function() {
	$("#pswd").val("");
	$("#pswd2").val("");
	$("#url").val("");
	$("#profile").attr("src","");
	$("#name").empty();

}

var login = function(login,secret) {
	console.log(login + " " + secret);
	$.post('kaiser.php', {"login":login,"secret":secret}, function(data) {
		console.log(data);
	});

}

var listUser =  function(username, name) {
	"<a username='"+ username +"'>"+
  	"<div class='person'>"+
  	"<img class='little' src='https://graph.facebook.com/" + username +"/picture'>"+
  	"<span class='user-name'>" + name + " </span>"+
  	"</div></a>";
}

var loadUsers = function() {
	$.post('kaiser.php', {"listUsers":true})
	.done(function(data){
		data.users.forEach(function(e){
			$("#list").append(listUser(e[0],e[1]));
		});
	});
}


