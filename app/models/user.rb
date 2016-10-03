class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  has_many :boards_users
  has_many :boards, through: :boards_users

  has_many :cards_users
  has_many :cards, through: :cards_users
end
