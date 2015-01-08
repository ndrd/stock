class StockController < ApplicationController
	def stock 
		@stock = 1
		if (params[:q])
			@stock = Item.find_by_description(params[:q])
		else
			@stock = Item.limit(25)
		end
		render "new"	 
	end 

	def search
		@search = Item.last(20)
		#query for a like search items
		if (params[:q])
			@search = Item.where('description LIKE ?', '%' + params[:q].to_s + '%').limit(20)
		end

		render json: @search

	end

	def cash 
		@cash = 1
		render "new"
	end

	def admin
		render "new"
#		redirect_to "/login" 
	end


	def info
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
		render "new" 
	end

	def users
		render "new"
	end
end
