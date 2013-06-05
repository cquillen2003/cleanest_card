class TasksController < ApplicationController
	
	def index
		@project_id = params[:id]
		render :layout => 'application_mobile'
	end
	
end
