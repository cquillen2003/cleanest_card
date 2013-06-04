class ProjectsController < ApplicationController
	
	before_filter :signed_in_user
	#before_filter :correct_user  #ToDo: Is something like this necessary for these actions for security?
	
	def index
		render :layout => 'application_mobile'
	end


  private
  
  	def signed_in_user
  		unless signed_in?
  			flash[:notice] = "Please sign in."
  			redirect_to new_session_path
  		end
  	end
end
