function Item(hash, code, description, sale, rank, category,stock,update) {
	this.hash = hash;
	this.code = code;
	this.description = description;
	this.sale = parseFloat(sale);
	this.rank = rank;
	this.category =  parseInt(category)
	this.stock = stock;
	this.update = update;
}

function Category(id) {
	this.id = id;
	this.total = 0;
	this.nItems = 0;
}



function User(username,name,range, rank, cover) {
	this.username  = username;
	this.name = name;
	this.range = range;
	this.rank = rank;
	this.cover = cover
	this.miniphoto = "https://graph.facebook.com/" + username + "/picture";
	this.photo =  "https://graph.facebook.com/" + username + "/picture?type=large";
}

function Ticket (User) {
	var d = new Date();
	this.check_out_date = d.toISOString();
	this.items = [];
	this.details = [];
	this.hashes = [];
	this.total = 0;
	this.saledItems = 0;
	this.user = User;
	
}

var HashTicket = {
	authenticity_token : null,

	ticket : {
		check_out_date : null,
		items : 0,
		total : 0,
		username : null,
		hushs : null,
	},

	init : function () {
		var d = new Date();
		HashTicket.ticket.check_out_date = d.toISOString();
		HashTicket.ticket.username = stock.user.username;
		HashTicket.ticket.items = stock.ticket.saledItems;
		HashTicket.ticket.total = stock.ticket.total;
		HashTicket.ticket.hushs = stock.ticket.hashes;

		var tokenContainer = document.getElementsByName("authenticity_token");
		var token = $(tokenContainer).val(); 

		HashTicket.authenticity_token = token;
	}
}

function TicketDetail(ticket) {
	this.user = ticket.user.username;
	this.nItems = ticket.saledItems;
	this.total = ticket.total;
	this.details = {};
	this.details.categories = ticket.details;
	this.details.hash = ticket.hashes;
}

Ticket.prototype.add = function(item) {
	if (typeof item != 'undefined') {
		this.items.push(item);
		this.saledItems++;
		this.total += item.sale;
		this.hashes.push(item.hush);
		category = new Category(item.category);
		if(typeof this.details[item.category] == "undefined") {
			this.details[item.category] = category;
			this.details[item]
		} 
		this.details[item.category].total  += item.sale;
		this.details[item.category].nItems++;
		

	} else {
		return;
	}
};

Ticket.prototype.delete = function(item) {
	if(typeof item != 'undefined') {
		this.items.pop(item);
		this.saledItems--;
		this.total -= item.sale;
		this.hashes.pop(item.hush);
		if(typeof this.details[item.category] != "undefined") {
			this.details[item.category].total  -= item.sale;
			this.details[item.category].nItems--;
		}

	}
};
