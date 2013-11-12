class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
    	t.integer :project_id
    	t.string :name
    	t.string :description
    	t.text :notes
    	t.string :status
    	t.string :priority
    	t.integer :order
    	t.date :due_date

      t.timestamps
    end
  end
end
