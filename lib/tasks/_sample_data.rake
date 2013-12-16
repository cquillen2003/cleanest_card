require 'faker'

namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		make_users
		make_categories
		make_projects
		make_project_tasks
		#make_independent_tasks
	end
end

def make_users
	User.create!(:first_name => "Corey",
		:last_name => "Quillen",
		:email => "corey.quillen@gmail.com",
		:password => "password",
		:password_confirmation => "password"
	)
	User.create!(:first_name => "Emily",
		:last_name => "Edwards",
		:email => "emily.edwards@gmail.com",
		:password => "password",
		:password_confirmation => "password"
	)	
	3.times do |n|
		first_name = Faker::Name.first_name
		last_name = Faker::Name.last_name
		email = Faker::Internet.email
		User.create!(:first_name => first_name,
			:last_name => last_name,
			:email => email,
			:password => "password",
			:password_confirmation => "password"
		)
	end
end

def make_categories
	users = User.all
	users.each do |user|
		category = user.categories.create!(:name => "Personal")
		category.save
		category = user.categories.create!(:name => "Business")
		category.save
	end
end		

def make_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			5.times do |n|
				name = "#{category.name} #{user.first_name} project number #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				status = "backlog"
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:status => status,
					:priority => priority
				)
				project.save
			end
		end
	end
end

def make_project_tasks
	users = User.all	
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			projects = category.projects
			projects.each do |project|
				5.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "planned"
					task = project.tasks.create!(:name => name, :status => status)
					task.save
				end
			end
		end
	end
end

def make_independent_tasks
	4.times do |n|
		name = Faker::Company.catch_phrase
		status = "backlog"
		Task.create!(:name => name,
			:status => status
		)
	end
end