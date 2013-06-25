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
	
	def mass_update
		@project = Project.find(params[:project_id])
		Task.update_all({ :status => "done" }, { :id => params[:task_ids] })
		redirect_to project_tasks_url(@project.id, :status => "planned")
	end
	
	def update
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
		@task.update_attributes(params[:task])
		render 'show'
	end
	
end
