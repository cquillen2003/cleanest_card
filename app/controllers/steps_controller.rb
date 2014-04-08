class StepsController < ApplicationController

	respond_to :html, :js, :json

	def index
		@item = Item.find(params[:item_id])
		@steps = @item.steps
		respond_with(@item, @steps)
	end

	def update
		puts 'steps controller update method called!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
		puts params[:step]

		@step = Item.find(params[:id])
		@step.update_attributes(params[:step])

		respond_with(@step)
	end

end
