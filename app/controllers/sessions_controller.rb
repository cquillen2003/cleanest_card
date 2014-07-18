class SessionsController < ApplicationController

	respond_to :json, :html

	before_filter :mobile_view
	
	def new
	end
	
	def create
		user = User.find_by_email(params[:session][:email].downcase)
		if user && user.authenticate(params[:session][:password])
			sign_in user

			#Generate jwt (json web token) for GoInstant authentication per their docs:
			#https://developers.goinstant.com/v1/security_and_auth/libraries/ruby.html

			#TODO: do not commit this secret_key (whoops, I already did)
			#secret_key = 'phNs7Vppl5iW-w9loG1t6lK20YqEe_bXuHlzuJqT8fOAQqOyF6NtUsVwWM9GUJo7zgBDRkkvvhLz4YobAfndCQ'

			#signer = GoInstant::Auth::Signer.new(secret_key)

			#token = signer.sign({
				#:domain => 'myrailsapp.com', #TODO: replace me
				#:id => user.id,
				#:user_id => user.id, #TODO: might be able to get rid of this, need to see how GoInstant handles it
				#:display_name => current_user.first_name,
				#:email => current_user.email
			#})

			#cookies.permanent[:goinstant_token] = token

			#redirect_to current_url
			render :nothing => true
		else
			flash.now[:error] = 'Invalid email/password combination'
			render 'new'
		end
	end
	
	def destroy
		sign_out
		render :nothing => true
		#redirect_to new_session_path
		#redirect_to root_url #undefined route now because of index.html driving angularjs_client
	end
	
end
