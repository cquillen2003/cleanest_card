class TasksController < ApplicationController
	
	def index
		@project = Project.find(params[:project_id])
		@tasks = @project.tasks.filter_by_status(params[:status])
		@planned_count = @project.tasks.filter_by_status("planned").count
		@started_count = @project.tasks.filter_by_status("started").count
		@done_count = @project.tasks.filter_by_status("done").count
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
