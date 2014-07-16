class CategoriesController < ApplicationController

	before_filter :signed_in_user

	respond_to :js, :json

	def default_serializer_options
    	{ root: false }
  	end

	def index
		@categories = current_user.categories

		respond_with(@categories)
	end


	private

		def signed_in_user
			unless signed_in?
				flash[:notice] = "Please sign in."
				redirect_to new_session_path
			end
		end	

end
