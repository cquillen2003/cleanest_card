require 'faker'

namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		make_users
		make_categories
		#make_backlog_projects
		make_backlog_items
		make_empty_backlog_items
		#make_split_projects
		#make_planned_projects
		#make_started_projects
		#make_done_projects
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

def make_backlog_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			5.times do |n|
				name = "#{category.name} #{user.first_name} backlog project no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:priority => priority
				)
				project.save
				5.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "backlog"
					task = project.tasks.create!(:name => name, :status => status)
					task.save
				end
			end
		end
	end
end

def make_backlog_items
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			5.times do |n|
				name = "#{category.name} #{user.first_name} backlog item no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				status = "backlog"
				priority = "high"
				#order = order + 1
				item = category.items.create!(:name => name,
					:description => description,
					:status => status,
					:priority => priority
				)
				item.save
				5.times do |n|
					name = "#{user.first_name} #{item.name} step #{n}"
					status = "backlog"
					step = item.steps.create!(:name => name, :status => status)
					step.save
				end
			end
		end
	end
end

def make_empty_backlog_items
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			5.times do |n|
				name = "#{category.name} #{user.first_name} empty backlog item no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				status = "backlog"
				priority = "high"
				#order = order + 1
				item = category.items.create!(:name => name,
					:description => description,
					:status => status,
					:priority => priority
				)
				item.save
			end
		end
	end
end

def make_split_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			2.times do |n|
				name = "#{category.name} #{user.first_name} split project no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:priority => priority
				)
				project.save
				5.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "backlog"
					task = project.tasks.create!(:name => name, :status => status)
					task.save
				end
				3.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "planned"
					task = project.tasks.create!(:name => name, :status => status)
					task.save					
				end				
			end
		end
	end
end

def make_planned_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			3.times do |n|
				name = "#{category.name} #{user.first_name} planned project no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:priority => priority
				)
				project.save
				3.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "planned"
					task = project.tasks.create!(:name => name, :status => status)
					task.save
				end
			end
		end
	end
end		

def make_started_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			2.times do |n|
				name = "#{category.name} #{user.first_name} started project no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:priority => priority
				)
				project.save
				3.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "planned"
					task = project.tasks.create!(:name => name, :status => status)
					task.save
				end
				2.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "started"
					task = project.tasks.create!(:name => name, :status => status)
					task.save					
				end
			end
		end
	end
end

def make_done_projects
	users = User.all
	users.each do |user|
		categories = user.categories
		categories.each do |category|
			3.times do |n|
				name = "#{category.name} #{user.first_name} done project no. #{n}"
				description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
				priority = "high"
				#order = order + 1
				project = category.projects.create!(:name => name,
					:description => description,
					:priority => priority
				)
				project.save
				5.times do |n|
					name = "#{user.first_name} #{project.name} task #{n}"
					status = "done"
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