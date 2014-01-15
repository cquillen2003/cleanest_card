class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :linkable_id
      t.string :linkable_type
      t.integer :user_id
      t.string :name
      t.string :description
      t.text :notes
      t.string :status
      t.string :priority
      t.integer :order
      t.date :due_date
      t.integer :items_count

      t.timestamps
    end
  end
end
