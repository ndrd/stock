class StockController < ApplicationController
	def stock 
		@stock = Item.limit(25)
		render "new"	 
	end 

	def cash 
		render "new"
	end

	def admin
		if session[:current_id] not nil
			render "new"
		end
		redirect_to "/login" 
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
