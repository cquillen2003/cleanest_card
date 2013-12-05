class CategoryUsersController < ApplicationController
	
	respond_to :html, :js, :json
	
	def index
		@categories = CategoryUser.all
	end
	
	def create
		email = params[:email]
		@user = User.where({ :email => email }).first
		if @user != nil
			@email = @user.email
			CategoryUser.create(:user_id => @user.id, :category_id => params[:category_id])
			
			projects = Project.plan_filter(current_user.id, params[:category_id])
			projects.each do |project|
				ProjectUser.create(:user_id => @user.id, :project_id => project.id, :category_id => params[:category_id])
			end
		else
			#send invite to email address
			@email = email + "*"
		end
			
		
		respond_with(@email)
	end
	
end
