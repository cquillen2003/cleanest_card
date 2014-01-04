class TasksController < ApplicationController

	respond_to :html, :js, :json
	
	def new
		@task = Task.new
	end

	def create
		@task = Task.new(params[:task])
		@task.save
		respond_with(@task)
	end

	def update
		@task = Task.find(params[:id])
		@task.update_attributes(params[:task])

		respond_with(@task)
	end
	
end
