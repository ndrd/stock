class CategoryController < ApplicationController

  def index
  	@categories = Category.all
  end

  def show
  	@category = Category.friendly.find(params[:id])
  end
end
