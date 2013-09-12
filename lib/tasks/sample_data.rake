require 'faker'

namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		#make_planned_projects
		#make_started_projects
		#make_done_projects
		#make_project_tasks
		make_independent_tasks
	end
end

def make_planned_projects
	5.times do |n|
		title = Faker::Company.catch_phrase
		status = "planned"
		order = order + 1
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_started_projects
	3.times do |n|
		title = Faker::Company.catch_phrase
		status = "started"
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_done_projects
	4.times do |n|
		title = Faker::Company.catch_phrase
		status = "done"
		Project.create!(:title => title,
			:status => status
		)
	end
end

def make_project_tasks
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

def make_independent_tasks
	4.times do |n|
		title = Faker::Company.catch_phrase
		status = "planned"
		Task.create!(:title => title,
			:status => status,
			:project_id => 0
		)
	end
end