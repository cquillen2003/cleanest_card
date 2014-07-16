class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :linkable_id
  has_many :tasks
end
