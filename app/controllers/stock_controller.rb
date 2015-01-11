class StockController < ApplicationController
	# verificar el metodo inicializador para verificar que se haya iniciado session

	#renders the stock 
	def stock 
	end 

	def search
		@search = Item.limit(20).where('id > 0').order(:last_check).reverse_order
		#query for a like search items
		if (params[:q] != "")
			@search = Item.limit(20).where('description LIKE ? OR  code LIKE ?', '%' + params[:q].to_s + '%','%' + params[:q].to_s + '%').order(:rank).reverse_order
		end
		render json: @search

	end

	def cash 
		@ticket = Ticket.new
	end

	def admin
		set_item
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

	def zmart
	end

	private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      if session[:current_user_id] == nil
      	redirect_to "/login" and return
      else
      	@user = User.find(session[:current_user_id])
      end

    end


end
