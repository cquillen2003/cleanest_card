class ProjectsController < ApplicationController
	
	before_filter :signed_in_user
	#before_filter :correct_user  #ToDo: Is something like this necessary for these actions for security?
	
	respond_to :html, :json, :js
	
	def index
		projects = Project.filter_by_status("planned")
		tasks = Task.stand_alone_tasks
		@items = projects + tasks
		@project = Project.new
	end
	
	def show
		@project = Project.find(params[:id])
		@tasks = @project.tasks
		@task = Task.new
		
		#respond_with(@project)
	end
	
	def update
		@project = Project.find(params[:id])
		@project.update_attributes(params[:project])
		
		respond_with(@project)
	end
	
	def new
		@project = Project.new
		respond_with(@project)
	end

	def edit
		@project = Project.find(params[:id])

		if @project.category_id
			category = Category.find(@project.category_id)
			category_users = category.users
		end
		project_users = @project.users
		@users = category_users + project_users
	end
	
	def create
		@project = Project.new(params[:project])
		@project.save
		
		respond_with(@project)
			#flash[:notice] = "Project created successfully"
		#else
			#render 'edit'
		#end
	end
	
	def destroy
		@project = Project.find(params[:id])
    @project.destroy
    respond_with(@project)
  end


  private
  
  	def signed_in_user
  		unless signed_in?
  			flash[:notice] = "Please sign in."
  			redirect_to new_session_path
  		end
  	end
end
