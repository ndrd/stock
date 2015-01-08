/**
* main js for the browser-control of the stock
*/

var stock = stock || {

	ticket : new Ticket(),
	item : new Item(),


	init :  function() {

	},


	/* get  item by its code */
	getItem :  function (code) {
		$.getJSON( apiUrl, {
		userInfo: true
	})
	.done(function( d) {
		window.user = new User(d[6],d[1],d[3],d[10]);
		newTicket();
		drawUser(window.user);
		
	});
	},

	error : {
		itemNotFound : new Error ("404 Elemento no encontrado"),
	}






};

