class BoardsController < ApplicationController
	
  def plan
  	
  	category_id = params[:cat]
  	if category_id.nil?
  		category_id = current_user.categories.first.id
  	end
  	@category = Category.find(category_id)
  	@categories = current_user.categories
  	
		projects = Project.plan_filter(current_user.id, category_id)
		#sa_tasks = Task.stand_alone_tasks
		@cards = projects
		
		@project = current_user.projects.build
		@user = User.new
		@category_user = CategoryUser.new

		#@cards = items.sort_by &:order  	
  end

  def current
  end
  
end
