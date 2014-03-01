class BoardsController < ApplicationController

  before_filter :signed_in_user

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

    if params[:bcats]
      bcat_array = params[:bcats]
    else    
      bcat_array = current_user.categories.pluck("categories.id")
    end

    if params[:expand_all_field]
      expand_all = params[:expand_all_field].to_i #WOW!  I think this fixed it. Burned a few hours on this gotcha
    else
      expand_all = 0
    end

    #output @bcat, @kcat, @view, @bcards, @kcards, @categories
    @categories = current_user.categories

    #cards
    @backlog_cards = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "backlog" })

    planned_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "planned" })

    started_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "started" })

    done_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array, :status => "done" })

    if expand_all == 0
      @planned_cards = planned_items
      @started_cards = started_items
      @done_cards = done_items
    else
      all_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array })
      #if @view == "tasks"
      #planned items
      planned_item_steps = []
      all_items.each do |item|
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
      all_items.each do |item|
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
      all_items.each do |item|
        done_item_steps = done_item_steps + item.steps.where({ :status => "done" })
      end

      done_empty_items = Item.where({ :linkable_type => "Category",
          :linkable_id => bcat_array,
          :status => "done",
          :items_count => 0
      }) 

      @done_cards = done_empty_items + done_item_steps #TODO: Add assigned items
    end
    


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

    if params[:expand_all_field]
      expand_all = params[:expand_all_field].to_i #WOW!  I think this fixed it. Burned a few hours on this gotcha
    else
      expand_all = 0
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


    if expand_all == 0
      @planned_cards = planned_items
      @started_cards = started_items
      @done_cards = done_items
    else
      all_items = Item.where({ :linkable_type => "Category", :linkable_id => bcat_array })
      #if @view == "tasks"
      #planned items
      planned_item_steps = []
      all_items.each do |item|
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
      all_items.each do |item|
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
      all_items.each do |item|
        done_item_steps = done_item_steps + item.steps.where({ :status => "done" })
      end

      done_empty_items = Item.where({ :linkable_type => "Category",
          :linkable_id => bcat_array,
          :status => "done",
          :items_count => 0
      }) 

      @done_cards = done_empty_items + done_item_steps #TODO: Add assigned items
    end


    respond_with(@planned_cards, @started_cards, @done_cards)

  end


  private
  
    def signed_in_user
      unless signed_in?
        flash[:notice] = "Please sign in."
        redirect_to new_session_path
      end
    end
  
end
