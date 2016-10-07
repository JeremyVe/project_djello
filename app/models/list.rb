class List < ActiveRecord::Base
  belongs_to :board

  has_many :cards,-> { where :completed => false }, class_name: 'Card'

  has_many :all_cards, class_name: 'Card', dependent: :destroy
end
