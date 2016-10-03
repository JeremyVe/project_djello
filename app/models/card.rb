class Card < ActiveRecord::Base
  belongs_to :list

  has_many :cards_users
  has_many :users, through: :cards_users
end
