class BoardsController < ApplicationController

  respond_to :html, :js
	
  def plan 	
    #input bcat, kcat, view
    if params[:bcat]
      @bcat = params[:bcat]
    else
      @bcat = current_user.categories.first
    end

    if params[:kcat]
      @kcat = params[:kcat]
    else
      @kcat = current_user.categories.first
    end

    #output @bcat, @kcat, @view, @bcards, @kcards, @categories
    @categories = current_user.categories

    if params[:bcats]
      bcat_array = params[:bcats]
    else    
      bcat_array = current_user.categories.pluck("categories.id")
    end
  
    
    #backlog cards
    #backlog_projects = Project.backlog(current_user.id, @bcat)
    #backlog_empty_projects = Project.without_tasks(current_user, @bcat, "backlog")
    #backlog_category_tasks = Category.find(@bcat).tasks.where({ :status => "backlog" })
    #backlog_assigned_tasks = current_user.tasks.where({ :status => "backlog" })
    #@backlog_cards = backlog_projects + backlog_empty_projects + backlog_category_tasks + backlog_assigned_tasks

    backlog_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "backlog" })
    @backlog_cards = backlog_items


    #planned cards
    #planned_items = Category.find(@bcat).items.where({ :status => "planned"})
    #@planned_cards = planned_items

    planned_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "planned" })
    @planned_cards = planned_items

    #started tasks
    #started_projects = Project.started(current_user.id, @kcat)
    #started_category_tasks = Category.find(@kcat).tasks.where({ :status => "started" })
    #started_assigned_tasks = current_user.tasks.where({ :status => "started" })
    #@started_cards = started_projects + started_category_tasks + started_assigned_tasks

    started_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "started" })
    @started_cards = started_items

    #done tasks
    #done_projects = Project.done(current_user.id, @kcat)      
    #done_category_tasks = Category.find(@kcat).tasks.where({ :status => "done" })
    #done_assigned_tasks = current_user.tasks.where({ :status => "done" })
   	#@done_cards = done_projects + done_category_tasks + done_assigned_tasks

    done_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "done" })
    @done_cards = done_items

    #respond_with() #TODO: Why is this not needed to call this action w/ ajax?

  end

  def current

    #input cat, view
    if params[:cat]
      @cat = params[:cat]
    else
      @cat = current_user.categories.first
    end

    if params[:view]
      @view = params[:view]
    else
      #@view = "projects"
      @view = "tasks"
    end

    if params[:bcats]
      bcat_array = params[:bcats]
    else    
      bcat_array = current_user.categories.pluck("categories.id")
    end    

    #output @cat, @view, @cards, @categories
    @categories = current_user.categories

    #cards
    #planned_projects = Project.planned(current_user.id, @cat)
    planned_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "planned" })

    #started_projects = Project.started(current_user.id, @cat)
    started_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "started" })

    #done_projects = Project.done(current_user.id, @cat)
    done_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "done" })


    if @view == "projects"
      @planned_cards = planned_projects
      @started_cards = started_projects
      @done_cards = done_projects
    else
      #if @view == "tasks"
      #planned items
      planned_item_steps = []
      planned_items.each do |item|
        planned_item_steps = planned_item_steps + item.steps.where({ :status => "planned" })
      end

      planned_empty_items = Item.where({ :linkable_type => "Category",
          :linkable_id => bcat_array,
          :status => "planned",
          :items_count => 0
      })

      @planned_cards = planned_empty_items + planned_item_steps #TODO: Add assigned items

      #started items
      started_item_steps = []
      started_items.each do |item|
        started_item_steps = started_item_steps + item.steps.where({ :status => "started" })
      end

      started_empty_items = Item.where({ :linkable_type => "Category",
          :linkable_id => bcat_array,
          :status => "started",
          :items_count => 0
      })

      @started_cards = started_empty_items + started_item_steps #TODO: Add assigned items

      #done items      
      done_item_steps = []
      done_items.each do |item|
        done_item_steps = done_item_steps + item.steps.where({ :status => "done" })
      end

      done_empty_items = Item.where({ :linkable_type => "Category",
          :linkable_id => bcat_array,
          :status => "done",
          :items_count => 0
      }) 

     	@done_cards = done_empty_items + done_item_steps #TODO: Add assigned items
    end

  end
  
end
