class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :linkable_id, :items_count
  has_many :tasks
end
