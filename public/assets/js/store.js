/**
* main js for the browser-control of the stock
*/

var stock = stock || {

	detailsURI : "details",
	searchURI : "search",
	ticket : new Ticket(),
	item : new Item(),
	$list : $("#list"), 

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
				return item
			
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

	toHtml : {
		_itemDetail :  function(item) {
			return "<a data-item='" + JSON.stringify(item) +"'><div class='little item'><span class='number'>"+ item.id + '</span>'+
		      '<span class="code">'+ item.code+ '</span>'+
		      '<span class="description">' + item.description +'</span>'+
		      '<span class="saleI">' + item.sale +'</span>' +
		      '<span class="stock">' + item.stock +'</span>'+
		      '<span class="upadte">' + prettyTime(item.update).fromNow() +'</span></div></a>';
		},

		itemGrid : function (items) {
			var html = ""
			for(i = 0; i < items.length; i++) {
					html += stock.toHtml._itemDetail(items[i]); 
			}
			return html;
		}


	},

	error : {
		itemNotFound : new Error ("404 Elemento no encontrado"),
		noSearchResults :  new Error("No hay resultados para esta busqueda"),
	}

};


