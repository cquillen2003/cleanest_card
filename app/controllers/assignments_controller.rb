class AssignmentsController < ApplicationController
	
	respond_to :html, :js, :json
	
	def create
		@email = params[:email]
		user = User.where({ :email => @email }).first
		if user
			@assignment = Assignment.new(:user_id => user.id, 
																		:assignable_id => params[:category_id],
																		:assignable_type => "Category")
			@assignment.save
			respond_with(@email)
		else
			#Send invite to new user
		end
	end
	
end
