class ProjectTasksController < ApplicationController

	respond_to :html, :js, :json
	
	def index
		@project = Project.find(params[:project_id])
		@tasks = @project.tasks
		respond_with(@project, @tasks)
	end

	def show
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
	end

	def new
		@project = Project.find(params[:project_id])
		@task = @project.tasks.build
		respond_with(@task)
	end
	
	def edit
		@project = Project.find(params[:project_id])
		@task = Task.find(params[:id])
	end

	def create
		@project = Project.find(params[:project_id])
		@task = @project.tasks.build(params[:task])
		@task.save

		respond_with(@project, @task)
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

	def destroy
		@task = Task.find(params[:id])
		@task.destroy
	end	

end
