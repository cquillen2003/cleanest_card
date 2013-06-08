class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
    	t.integer :project_id
    	t.string :title
    	t.string :status
    	t.integer :order

      t.timestamps
    end
  end
end
