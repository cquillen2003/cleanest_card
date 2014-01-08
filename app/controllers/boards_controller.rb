class BoardsController < ApplicationController
	
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

    if params[:view]
      @view = params[:view]
    else
      @view = "projects"
    end

    #output @bcat, @kcat, @view, @bcards, @kcards, @categories
    @categories = current_user.categories
    
    #backlog
    backlog_projects = Project.backlog(current_user.id, @bcat)
    backlog_tasks = Category.find(@bcat).tasks.where({ :status => "backlog" })
    @backlog_cards = backlog_projects + backlog_tasks

    planned_projects = Project.planned(current_user.id, @kcat)
    started_projects = Project.started(current_user.id, @kcat)
    done_projects = Project.done(current_user.id, @kcat) 

    #kanban board
    if @view == "projects"
      @planned_cards = planned_projects
      @started_cards = started_projects
      @done_cards = done_projects
    end
    if @view == "tasks"
      #planned tasks
      planned_project_tasks = []
      planned_projects.each do |project|
        planned_project_tasks = planned_project_tasks + project.tasks.where({ :status => "planned" })
      end

      planned_category_tasks = Category.find(@kcat).tasks.where({ :status => "planned" })
      planned_assigned_tasks = current_user.tasks.where({ :status => "planned" })

      @planned_cards = planned_project_tasks + planned_category_tasks + planned_assigned_tasks

      #started tasks
      started_project_tasks = []
      started_projects.each do |project|
        started_project_tasks = started_project_tasks + project.tasks.where({ :status => "started" })
      end

      started_category_tasks = Category.find(@kcat).tasks.where({ :status => "started" })
      started_assigned_tasks = current_user.tasks.where({ :status => "started" })

      @started_cards = started_project_tasks + started_category_tasks + started_assigned_tasks

      #done tasks      
      done_project_tasks = []
      done_projects.each do |project|
        done_project_tasks = done_project_tasks + project.tasks.where({ :status => "done" })
      end

      done_category_tasks = Category.find(@kcat).tasks.where({ :status => "done" })
      done_assigned_tasks = current_user.tasks.where({ :status => "done" })

     	@done_cards = done_project_tasks + done_category_tasks + done_assigned_tasks
    end 

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
    planned_split_projects = Project.planned_split(current_user.id, @cat)

    started_projects = Project.started(current_user.id, @cat)
    started_split_projects = Project.started_split(current_user.id, @cat)

    done_projects = Project.done(current_user.id, @cat)
    done_split_projects = Project.done_split(current_user.id, @cat)


    if @view == "projects"
      @planned_cards = planned_projects + planned_split_projects
      @started_cards = started_projects + started_split_projects
      @done_cards = done_projects + done_split_projects
    end
    if @view == "tasks"
      #planned tasks
      planned_project_tasks = []
      planned_projects = planned_projects + planned_split_projects
      planned_projects.each do |project|
        planned_project_tasks = planned_project_tasks + project.tasks.where({ :status => "planned" })
      end

      planned_category_tasks = Category.find(@cat).tasks.where({ :status => "planned" })
      planned_assigned_tasks = current_user.tasks.where({ :status => "planned" })

      @planned_cards = planned_project_tasks + planned_category_tasks + planned_assigned_tasks

      #started tasks
      started_project_tasks = []
      started_projects = started_projects + started_split_projects
      started_projects.each do |project|
        started_project_tasks = started_project_tasks + project.tasks.where({ :status => "started" })
      end

      started_category_tasks = Category.find(@cat).tasks.where({ :status => "started" })
      started_assigned_tasks = current_user.tasks.where({ :status => "started" })

      @started_cards = started_project_tasks + started_category_tasks + started_assigned_tasks

      #done tasks      
      done_project_tasks = []
      done_projects = done_projects + done_split_projects
      done_projects.each do |project|
        done_project_tasks = done_project_tasks + project.tasks.where({ :status => "done" })
      end

      done_category_tasks = Category.find(@cat).tasks.where({ :status => "done" })
      done_assigned_tasks = current_user.tasks.where({ :status => "done" })

     	@done_cards = done_project_tasks + done_category_tasks + done_assigned_tasks
    end

  end
  
end
