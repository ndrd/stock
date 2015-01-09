class StockController < ApplicationController
	# verificar el metodo inicializador para verificar que se haya iniciado session

	#renders the stock 
	def stock 
	end 

	def search
		@search = Item.where('id > 0').order(:last_check).limit(20)
		#query for a like search items
		if (params[:q] != "")
			@search = Item.where('description LIKE ?', '%' + params[:q].to_s + '%').order(:rank).limit(20)
		end
		render json: @search

	end

	def cash 
		@ticket = Ticket.new
	end

	def admin
	end


	def info
		render "new"
	end

	def categories
		render "new"
	end
	

	def details
		@item = Item.find_by_code(params[:code])
		render json: @item
	end

	

	def pays
		render "new"
	end

	def events
	end

	def users
		render "new"
	end
end
