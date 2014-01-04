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
    
    #bcards
    category_bcards = Category.find(@bcat).projects
    assigned_bcards = current_user.projects
    task_bcards = Category.find(@bcat).tasks
    bcards = category_bcards + assigned_bcards + task_bcards
    @bcards = bcards.uniq

    #kcards
    if @view == "projects"
      category_kcards = Category.find(@kcat).projects
      assigned_kcards = current_user.projects
      kcards = category_kcards + assigned_kcards
      @kcards = kcards.uniq
    end
    if @view == "tasks"
      category_kcards = Category.find(@kcat).tasks
      assigned_kcards = current_user.tasks

      category_projects = Category.find(@kcat).projects
      assigned_projects = current_user.projects
      projects = category_projects + assigned_projects
      projects = projects.uniq

      project_kcards = []
      projects.each do |project|
        project_kcards = project_kcards + project.tasks
      end

      kcards = category_kcards + assigned_kcards + project_kcards
      @kcards = kcards.uniq
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
    if @view == "projects"
      category_cards = Category.find(@cat).projects
      assigned_cards = current_user.projects
      cards = category_cards + assigned_cards
      @cards = cards.uniq
    end
    if @view == "tasks"
      category_cards = Category.find(@cat).tasks
      assigned_cards = current_user.tasks
      cards = category_cards + assigned_cards
      @cards = cards.uniq
    end

  end
  
end
