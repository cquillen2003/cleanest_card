class TasksController < ApplicationController

	respond_to :html, :js, :json
	
	def index
		@item = Item.find(params[:item_id])
		@tasks = @item.tasks
		respond_with(@item, @tasks)
	end

	def show
		@item = Item.find(params[:item_id])
		@task = Item.find(params[:id])
	end

	def new
		@item = Item.find(params[:item_id])
		@task = @item.tasks.build
		respond_with(@task)
	end
	
	def edit
		#@project = Project.find(params[:project_id])
		@task = Item.find(params[:id])
	end

	def create
		@item = Item.find(params[:item_id])
		@task = @item.tasks.build(params[:task])
		@task.save

		respond_with(@item, @task)
	end
	
	def update
		#@project = Project.find(params[:project_id])
		@task = Item.find(params[:id])
		@task.update_attributes(params[:task])
		respond_with(@task)
	end

	def destroy
		@task = Item.find(params[:id])
		@task.destroy
	end
	
end
