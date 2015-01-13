class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /items
  # GET /items.json
  def index
    redirect_to "/stock"
  end

  # GET /items/1
  # GET /items/1.json
  def show
      begin
        @item = Item.friendly.find(params[:id])
      rescue Exception => e
        redirect_to "/stock" and return
      end

  end

  # GET /items/new
  def new
    flash[:alert] = nil
    @item = Item.new
  end

  def cash
    render 
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)
    error = false;
    begin
      @item.save
     rescue Exception => e
      error = true
      @item.destroy
      flash[:alert] = e.to_s
    end 
    
    if error
      render "new" and return
    else
      redirect_to @item
    end


  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to "/stock?q=", notice: 'Articulo actualizado' }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST/items/1
  def destroy
    if session[:current_user_id] == nil
      redirect_to "/login"
    end
    begin
          @item = Item.friendly.find(params[:id])
    rescue Exception => e
      redirect_to "/stock" and return
    end
    
    if @item.destroy
      redirect_to "/stock"
    end
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      begin
        @item = Item.friendly.find(params[:id])
          rescue Exception => e
        @item = Item.new 
      end

    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.require(:item).permit(:description, :sale, :cost, :code, :hush, :rank, :category, :last_check, :stock, :s)
    end
end
