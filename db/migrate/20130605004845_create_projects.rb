class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
    	t.string :title
    	t.string :status
    	t.integer :order

      t.timestamps
    end
  end
end
