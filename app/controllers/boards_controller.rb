class BoardsController < ApplicationController
	
  def plan
  	
  	category_id = params[:cat]
  	if category_id.nil?
  		category_id = current_user.categories.first.id
  	end
  	@category = Category.find(category_id)
  	@categories = current_user.categories
  	
  	projects = @category.projects
  	
		#sa_tasks = Task.stand_alone_tasks
		@cards = projects
		
		@project = Project.new
		@user = User.new

		#@cards = items.sort_by &:order  	
  end

  def current
  end
  
end
