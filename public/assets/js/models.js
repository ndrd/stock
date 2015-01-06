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
	this.date = Date.now();
	this.items = [];
	this.details = [];
	this.hashes = [];
	this.total = 0;
	this.saledItems = 0;
	this.user = user;
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
	if (item instanceof Item) {
		this.items.push(item);
		this.saledItems++;
		this.total += item.sale;
		this.hashes.push(item.hash);
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
	if(item instanceof Item) {
		this.items.pop(item);
		this.saledItems--;
		this.total -= item.sale;
		this.hashes.pop(item.hash);
		if(typeof this.details[item.category] != "undefined") {
			this.details[item.category].total  -= item.sale;
			this.details[item.category].nItems--;
		}

	}
};
