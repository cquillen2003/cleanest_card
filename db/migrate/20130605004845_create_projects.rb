class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
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
