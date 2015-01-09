class LoginsController < ApplicationController

  # show the login page or redirect to user's page if its in 
  def login
    @login = Login.new
 
    if session[:current_user_id] != nil
      @user = User.find(session[:current_user_id])
      redirect_to @user
    else
      render :layout => false
    end
  end

  def logout
    session[:current_user_id] = nil
    redirect_to "/login"
  end

  # do the login 
  def create
    @login = Login.find_by_username(login_params[:username])
    secret = Digest::SHA1.hexdigest(login_params[:secret])

    if @login && @login.secret == secret
      @user = User.friendly.find(@login.username)
      
      if @user.nil?
        flash[:alert] = "Usuario no encontrado"
        redirect_to "/login"
      else
        session[:current_user_id] = @user.id
        redirect_to "/"
      end

    else
      flash[:alert] = "Usuario o contraseña incorrecta"
      redirect_to "/login"
    end

  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_login
      @login = Login.new
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def login_params
        params.require(:login).permit(:username, :secret)
    end
end
