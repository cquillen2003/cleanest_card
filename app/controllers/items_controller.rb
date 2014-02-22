class ItemsController < ApplicationController

	respond_to :html, :js, :json

	def new
		@item = Item.new
    @linkable_id = current_user.categories.first.id

		respond_with(@item, @linkable_id)
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

      latest_split_item = Item.latest_split(item.id).first

      if !latest_split_item
        #create a split and a new project first
        @new_item = Item.create!(:linkable_id => item.linkable_id,
            :linkable_type => item.linkable_type,
            :name => item.name + " (Split Testing)"
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
  	end
	
end
