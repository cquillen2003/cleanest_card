class StepsController < ApplicationController

	respond_to :html, :js, :json

	def index
		@item = Item.find(params[:item_id])
		@steps = @item.steps
		respond_with(@item, @steps)
	end

end
