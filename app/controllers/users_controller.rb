class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.friendly.find(params[:id])
  end

  # GET /users/new
  def new
    @user = User.new
    render :layout => false
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new
    @user_exists = false#User.friendly.find(params[:user][:username])
    
    if @user_exists
      flash[:alert] = "Este nombre de usuario ya existe"
      render "new", :layout => false and return
    end

    @user.name = params[:user][:name]

    @user.username  =  params[:user][:username]

    @login = Login.new
    @login.username = @user.username

    if params[:user][:secret] != params[:user][:secret_confirm]
      @login.destroy && user.destroy
      flash[:alert] = "Las contraseñas no coinciden"
      render "new", :layout => false and return
    end
    
    @login.secret = Digest::SHA1.hexdigest(params[:user][:secret])
    @login.last_login = Time.zone.now
    
    error = false

    begin
      @user.save && @login.save 

     rescue Exception => e
      error = true
      @login.destroy
      flash[:alert] = e.to_s
    end 

    if !error
      session[:current_user_id] = @user.id
      flash[:alert] = "Bienvenido a bordo!"
      redirect_to @user
    else
      @login.destroy
      render "new"
    end

  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.new
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :username, :secret, :secret_confirm)
    end
end
