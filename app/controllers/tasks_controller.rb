class TasksController < ApplicationController
	
	def index
		@project = Project.find(params[:project_id])
		@tasks = @project.tasks.filter_by_status(params[:status])
		render :layout => 'application_mobile'
	end
	
	def show
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
		render :layout => 'application_mobile'
	end
	
	def edit
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
		render :layout => 'application_mobile'
	end
	
	def update
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
		@task.update_attributes(params[:task])
		render 'show'
	end
	
end
