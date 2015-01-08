/**
* main js for the browser-control of the stock
*/
prettyTime = moment;
prettyTime.lang("es");

var stock = stock || {

	searchON : false, 
	detailsURI : "details",
	searchURI : "search",
	ticket : new Ticket(),
	item : new Item(),

	$list : $("#list"), 
	$suggestionsHolder : $("#results"),

	init :  function() {
		
	},


	/* get  item by its code */
	getItem :  function (code) {
		$.getJSON( stock.detailsURI, {
			code : code
		})
		.done(function(item) {
			if (item === null)
				throw stock.error.itemNotFound;
			else
				console.log(item)
			
		});
	},

	/* list items to the stock grid */
	getItems : function (filter) {
		$.getJSON(stock.searchURI, {
			q : filter
		})
		.done (function (results) {
			if (results === null || results.length === 0)
				throw stock.error.noSearchResults;
			else {
				var html = stock.toHtml.itemGrid(results);
				stock.$list.empty().append(html);
			}
				
		})
			

	},

	/* Instant search */
	instantSearch : function (query) {
		$.getJSON(stock.searchURI, {
			q : query
		})
		.done (function (results) {
			if (results === null || results.length === 0)
				throw stock.error.noSearchResults;
			else {
				var html = stock.toHtml.suggestions(results);
				stock.$suggestionsHolder.empty().append(html);
			}
				
		})
	},

	toHtml : {
		_itemDetail :  function(item) {
			return "<a href='stock/item/" + item.slug +"'><div class='little item'><span class='number'>"+ item.id + '</span>'+
		      '<span class="code">'+ item.code+ '</span>'+
		      '<span class="description">' + item.description +'</span>'+
		      '<span class="saleI">' + item.sale +'</span>' +
		      '<span class="stock">' + item.stock +'</span>'+
		      '<span class="update">' + prettyTime(item.update).fromNow() +'</span></div></a>';
		},

		itemGrid : function (items) {
			var html = ""
			for(i = 0; i < items.length; i++) {
				html += stock.toHtml._itemDetail(items[i]); 
			}
			return html;
		},

		_item : function( item ) {
			return "<a data-item='" + JSON.stringify(item) +"'><div class='item'><span class='number'>"+ item.id + '</span>'+
		      '<span class="code">'+ item.code+ '</span>'+
		      '<span class="description">' + item.description +'</span>'+
		      '<span class="saleI">' + item.sale +'</span></div></a>';
		},

		_itemyze : function (item) {
			return "<li data='" + JSON.stringify(item)+ "'><span class='description'>" + item.description +"</span><strong class='sale'>" + item.sale +"</strong></li>"
		},

		suggestions : function (items) {
			var html = "";
			for (i = 0; i < items.length; i++ ) 
				html += stock.toHtml._itemyze(items[i]);
			return html;
		},

		showError : function (error) {

		}


	},

	error : {
		itemNotFound : new Error ("404 Elemento no encontrado"),
		noSearchResults :  new Error("No hay resultados para esta busqueda"),
	}

};


