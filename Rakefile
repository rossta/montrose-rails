# frozen_string_literal: true
require "bundler/gem_tasks"
require "rake/testtask"
require "rubocop/rake_task"

APP_RAKEFILE = File.expand_path("../spec/sample/Rakefile", __FILE__)
load "rails/tasks/engine.rake"

begin
  require "rspec/core/rake_task"
  RSpec::Core::RakeTask.new(:spec)

  require "rubocop/rake_task"
  RuboCop::RakeTask.new(:rubocop)
rescue LoadError
end

task default: [:spec, :rubocop]
