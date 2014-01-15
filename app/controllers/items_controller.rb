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
	end		
	
end
