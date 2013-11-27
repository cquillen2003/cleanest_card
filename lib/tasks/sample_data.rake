require 'faker'

namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		make_backlog_projects
		make_planned_projects
		make_started_projects
		make_done_projects
		make_project_tasks
		make_independent_tasks
	end
end

def make_backlog_projects
	10.times do |n|
		name = Faker::Company.catch_phrase
		description = Faker::Lorem.sentences(sentence_count = 2, supplemental = false)
		status = "backlog"
		priority = "high"
		#order = order + 1
		Project.create!(:name => name,
			:description => description,
			:status => status,
			:priority => priority
		)
	end
end

def make_planned_projects
	5.times do |n|
		name = Faker::Company.catch_phrase
		status = "planned"
		#order = order + 1
		Project.create!(:name => name,
			:status => status
		)
	end
end

def make_started_projects
	3.times do |n|
		name = Faker::Company.catch_phrase
		status = "started"
		Project.create!(:name => name,
			:status => status
		)
	end
end

def make_done_projects
	4.times do |n|
		name = Faker::Company.catch_phrase
		status = "done"
		Project.create!(:name => name,
			:status => status
		)
	end
end

def make_project_tasks
	projects = Project.all
	projects.each do |project|
		5.times do |n|
			name = Faker::Company.catch_phrase
			status = "planned"
			task = project.tasks.create!(:name => name, :status => status)
			task.save
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