class BoardsController < ApplicationController
	
  def plan
		projects = Project.all
		sa_tasks = Task.stand_alone_tasks
		@cards = projects + sa_tasks
		
		@project = Project.new

		#@cards = items.sort_by &:order  	
  end

  def current
  end
  
end
