class UsersController < ApplicationController
	
	before_filter :signed_in_user, only: [:show]
	before_filter :correct_user, only: [:show]
	
	respond_to :html, :json, :js
	
  def new
  end
  
  def create
  	@user = User.new(params[:user])
  	if @user.save
  		respond_with(@user)
  	else
  		#handle errors
  	end
  end
  
  def show
  end
  
  
  private
  
  	def signed_in_user
  		unless signed_in?
  			flash[:notice] = "Please sign in."
  			redirect_to new_session_path
  		end
  	end
  	
  	def correct_user
  		@user = User.find(params[:id])
  		unless current_user?(@user)
  			redirect_to(root_path)
  		end
  	end
end
