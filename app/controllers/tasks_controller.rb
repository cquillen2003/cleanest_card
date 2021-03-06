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
		#@project = Project.find(params[:project_id]) #these methods were copied from old project_tasks controller
		@task = Item.find(params[:id])
	end

	def create
		@item = Item.find(params[:item_id])
		@task = @item.tasks.build(params[:task])
		@task.save

		#location inlcuded below because of strange error
		#http://stackoverflow.com/questions/7303551/rails-respond-with-acting-different-in-index-and-create-method
		respond_with(@item, @task, :location => "")
	end
	
	def update
		#@project = Project.find(params[:project_id])
		@task = Item.find(params[:id])
		@task.update_attributes(params[:task])
		respond_with(@task)

		Item.reset_counters(params[:item_id], :tasks)
	end

	def destroy
		@task = Item.find(params[:id])
		@task.destroy
	end
	
end
