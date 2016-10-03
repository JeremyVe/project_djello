class UsersController < ApplicationController

  def index
    @users = User.where('username ~* ?', params[:search])

    respond_to do |format|
      format.json { render :json => @users, status: 200 }
    end
  end

end
