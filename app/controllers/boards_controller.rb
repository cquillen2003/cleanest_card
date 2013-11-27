class BoardsController < ApplicationController
	
  def plan
		projects = Project.all
		tasks = Task.stand_alone_tasks
		@items = projects + tasks		
		@project = Project.new

		#@items = items.sort_by &:order  	
  end

  def current
  end
  
end
