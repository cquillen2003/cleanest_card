class BoardsController < ApplicationController
	
  def plan 	
    #input bcat, kcat, view
    @bcat = params[:bcat]
    @kcat = params[:kcat]
    @view = params[:view]

    #output @bcat, @kcat, @view, @bcards, @kcards, @categories
    @categories = current_user.categories
    
    #bcards
    category_bcards = Category.find(@bcat).projects
    assigned_bcards = current_user.projects
    bcards = category_bcards + assigned_bcards
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
      kcards = category_kcards + assigned_kcards
      @kcards = kcards.uniq
    end    
  end

  def current
  end
  
end
