class TasksController < ApplicationController

	respond_to :html, :json, :js
	
	def index
		@project = Project.find(params[:project_id])
		@tasks = @project.tasks.filter_by_status("planned")
		respond_with(@project, @tasks)
	end
	
	def show
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
	end
	
	def edit
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
	end
	
	def mass_update
		@project = Project.find(params[:project_id])
		status = params[:status]
		Task.update_all({ :status => status }, { :id => params[:task_ids] })
		redirect_to project_tasks_url(@project.id, :status => "planned")
	end
	
	def update
		#@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
		@task.update_attributes(params[:task])
		render 'show'
	end
	
end
