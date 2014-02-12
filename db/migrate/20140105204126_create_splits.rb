class CreateSplits < ActiveRecord::Migration
  def change
    create_table :splits do |t|
      t.integer :item_id
      t.integer :new_item_id

      t.timestamps
    end
  end
end
