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
    planned_items = Category.find(@bcat).items.where({ :status => "planned"})
    @planned_cards = planned_items

    #started tasks
    started_projects = Project.started(current_user.id, @kcat)
    started_category_tasks = Category.find(@kcat).tasks.where({ :status => "started" })
    started_assigned_tasks = current_user.tasks.where({ :status => "started" })
    @started_cards = started_projects + started_category_tasks + started_assigned_tasks

    #done tasks
    done_projects = Project.done(current_user.id, @kcat)      
    done_category_tasks = Category.find(@kcat).tasks.where({ :status => "done" })
    done_assigned_tasks = current_user.tasks.where({ :status => "done" })
   	@done_cards = done_projects + done_category_tasks + done_assigned_tasks

    respond_with(@backlog_cards)

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
      @view = "projects"
    end

    #output @cat, @view, @cards, @categories
    @categories = current_user.categories

    #cards
    planned_projects = Project.planned(current_user.id, @cat)

    started_projects = Project.started(current_user.id, @cat)

    done_projects = Project.done(current_user.id, @cat)

    if @view == "projects"
      @planned_cards = planned_projects
      @started_cards = started_projects
      @done_cards = done_projects
    end
    if @view == "tasks"
      #planned tasks
      planned_project_tasks = []
      planned_projects = planned_projects
      planned_projects.each do |project|
        planned_project_tasks = planned_project_tasks + project.tasks.where({ :status => "planned" })
      end

      planned_category_tasks = Category.find(@cat).tasks.where({ :status => "planned" })
      planned_assigned_tasks = current_user.tasks.where({ :status => "planned" })

      @planned_cards = planned_project_tasks + planned_category_tasks + planned_assigned_tasks

      #started tasks
      started_project_tasks = []
      started_projects.each do |project|
        started_project_tasks = started_project_tasks + project.tasks.where({ :status => "started" })
      end

      started_category_tasks = Category.find(@cat).tasks.where({ :status => "started" })
      started_assigned_tasks = current_user.tasks.where({ :status => "started" })

      @started_cards = started_project_tasks + started_category_tasks + started_assigned_tasks

      #done tasks      
      done_project_tasks = []
      done_projects.each do |project|
        done_project_tasks = done_project_tasks + project.tasks.where({ :status => "done" })
      end

      done_category_tasks = Category.find(@cat).tasks.where({ :status => "done" })
      done_assigned_tasks = current_user.tasks.where({ :status => "done" })

     	@done_cards = done_project_tasks + done_category_tasks + done_assigned_tasks
    end

  end
  
end
