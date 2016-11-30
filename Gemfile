source 'https://rubygems.org'

# Specify your gem's dependencies in montrose-rails.gemspec
gemspec

group :development do
  unless ENV["TRAVIS"]
    gem "pry-byebug", platforms: [:ruby_21, :ruby_22, :ruby_23]
    gem "guard", platforms: [:ruby_22, :ruby_23] # Guard no longer supports ruby 2.1
    gem "guard-minitest", platforms: [:ruby_22, :ruby_23]
    gem "guard-rubocop", platforms: [:ruby_22, :ruby_23]
  end

  gem "yard"
  gem "coveralls"
end
