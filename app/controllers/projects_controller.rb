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
		respond_with(@project)
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
	
	def create
		@project = current_user.projects.create(params[:project])
		
		project_user = ProjectUser.where({ :user_id => current_user.id, :project_id => @project.id })
		project_user.update_all(:category_id => params[:category_id])
		
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
