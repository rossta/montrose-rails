# frozen_string_literal: true
source "https://rubygems.org"

# Specify your gem's dependencies in montrose-rails.gemspec
gemspec

group :development, :test do
  unless ENV["TRAVIS"]
    gem "pry-byebug", platforms: [:ruby_21, :ruby_22, :ruby_23]
    gem "guard", platforms: [:ruby_22, :ruby_23] # Guard no longer supports ruby 2.1
    gem "guard-rubocop", platforms: [:ruby_22, :ruby_23]
  end

  gem "pg", "~> 0.18"
  gem "puma", "~> 3.0"
  gem "sass-rails", "~> 5.0"
  gem "uglifier", ">= 1.3.0"
  gem "browserify-rails"
  gem "jquery-rails"
  gem "montrose", github: "rossta/montrose", branch: "master"

  gem "rspec-rails"
  gem "capybara-rails"
  gem "simple_calendar"
end

group :development do
  gem "yard"

  gem "web-console"
  gem "listen", "~> 3.0.5"
end

group :test do
  gem "coveralls"
  gem "selenium-webdriver", "~> 3.0.0"
  gem "launchy"
  gem "database_cleaner"
end
