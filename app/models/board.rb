class Board < ActiveRecord::Base

  has_many :boards_users

  has_many :users, through: :boards_users

  has_many :lists, dependent: :destroy
  
end
