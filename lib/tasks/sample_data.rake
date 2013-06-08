require 'faker'

namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		make_planned_projects
		make_started_projects
		make_done_projects
		make_tasks
	end
end

def make_planned_projects
	20.times do |n|
		title = Faker::Company.catch_phrase
		status = "planned"
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_started_projects
	5.times do |n|
		title = Faker::Company.catch_phrase
		status = "started"
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_done_projects
	10.times do |n|
		title = Faker::Company.catch_phrase
		status = "done"
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_tasks
	projects = Project.all
	projects.each do |project|
		5.times do |n|
			title = Faker::Company.catch_phrase
			status = "planned"
			task = project.tasks.create!(:title => title, :status => status)
			task.save
		end
	end
end