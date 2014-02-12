class ItemsController < ApplicationController

	respond_to :html, :js, :json

	def new
		@item = Item.new

		respond_with(@item)
	end

	def create
		@item = Item.new(params[:item])
		@item.save

		respond_with(@item)
	end

	def edit
		@item = Item.find(params[:id])
	end

	def update
		@item = Item.find(params[:id])
		@item.update_attributes(params[:item])

		respond_with(@item)
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
  	end

    def split
      item = Item.find(params[:id])
      step = Item.find(params[:step])
      if item.splits.length == 0
        #create a split and a new project first
        @new_item = Item.create!(:linkable_id => item.linkable_id, :name => item.name + " (Split Testing)")
        Split.create!(:item_id => item.id, :new_item_id => @new_item.id)
        step.update_attributes({ :linkable_id => @new_item.id, :status => 'planned' })       
      else
        #add task to existing
      end
      respond_with(@new_item)
    end    

  	def link_items
  		Item.update_all(
  			{ :linkable_id => params[:parent_id], :linkable_type => "Item" },
  			{ :id => params[:item_ids] }
  		)
  	end
	
end
