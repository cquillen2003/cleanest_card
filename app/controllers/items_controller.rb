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
	
end
