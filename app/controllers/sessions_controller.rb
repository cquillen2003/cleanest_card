class SessionsController < ApplicationController
	
	def new
	end
	
	def create
		user = User.find_by_email(params[:session][:email].downcase)
		if user && user.authenticate(params[:session][:password])
			sign_in user
			redirect_to current_url
		else
			flash.now[:error] = 'Invalid email/password combination'
			render 'new'
		end
	end
	
	def destroy
		sign_out
		redirect_to new_session_path
		#redirect_to root_url #undefined route now because of index.html driving angularjs_client
	end
	
end
