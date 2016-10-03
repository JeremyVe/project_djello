# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


puts 'Creating users'

20.times do |i|
  u = User.new()

  u.username = Faker::Internet.user_name
  u.email = Faker::Internet.email(u.username)
  u.password = 'password'
  u.password_confirmation = 'password'
  u.save
end

puts 'Created 20 users'