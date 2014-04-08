class ItemsController < ApplicationController

	respond_to :json, :html

  def index
    #category = current_user.categories.first
    #@items = category.items

    bcat_array = current_user.categories.pluck("categories.id")

    if params[:type] == 'project'
      @items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :item_type => "Project"})
    elsif params[:type] == 'projecttask'
      projects = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :item_type => "Project"})
      
      project_tasks = []
      projects.each do |project|
        project_tasks = project_tasks + project.tasks
      end
      
      @items = project_tasks
    elsif params[:type] == 'task'
      @items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :item_type => "Task"})
    else
      @items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array})
    end

    respond_with(@items)
  end

  def show
    @item = Item.find(params[:id])
    respond_with(@item)
  end

	def new
		@item = Item.new

		respond_with(@item)
	end

	def create
		@item = Item.new(params[:item])
    category = current_user.categories.first
    #current_user is nil for some reason when calling this method from angularjs_client
    #This problem has to do with CSRF protection (see warning in console from web server)
    #The following solution seems to be working:
    #http://technpol.wordpress.com/2013/09/21/angularjs-and-rails-csrf-protection/
    @item.linkable_id = category.id if @item.linkable_id.blank?
		@item.save

		respond_with(@item)
	end

	def edit
		@item = Item.find(params[:id])
	end

	def update
    puts 'items controller called here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    puts params[:item]

		@item = Item.find(params[:id])
		@item.update_attributes(params[:item])

		respond_with(@item)
    #render :edit
	end

	def destroy
		@item = Item.find(params[:id])
    	@item.destroy
    	
    	respond_with(@item)
  	end	

  	def plan
  		item = Item.find(params[:id])
  		items_count = item.items_count
  		if items_count == nil
  			item.update_attribute(:status, params[:to])
  		elsif items_count == 0
  			item.update_attribute(:status, params[:to])
  		else
  			item.steps.each do |step|
  				step.update_attribute(:status, params[:to])
  			end
  		end
      Item.reset_counters(item.id, :steps)
  	end

    def split
      item = Item.find(params[:id])
      step = Item.find(params[:step])

      latest_split_item = Item.latest_split(item.id).first

      if !latest_split_item
        #create a split and a new project first
        @new_item = Item.create!(:linkable_id => item.linkable_id,
            :linkable_type => item.linkable_type,
            :name => item.name + " (Split)"
        )
        Split.create!(:item_id => item.id, :new_item_id => @new_item.id)
        step.update_attributes({ :linkable_id => @new_item.id, :status => 'planned' })
        respond_with(@new_item)
        Item.reset_counters(@new_item.id, :steps)
      else
        #add task to existing
        step.update_attributes({ :linkable_id => latest_split_item.id, :status => 'planned' })
      end
    end    

  	def link_items
  		Item.update_all(
  			{ :linkable_id => params[:parent_id], :linkable_type => "Item" },
  			{ :id => params[:item_ids] }
  		)
      Item.reset_counters(params[:parent_id], :steps)
  	end
	
end
