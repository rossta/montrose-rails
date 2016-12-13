# coding: utf-8
# frozen_string_literal: true
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "montrose/rails/version"

Gem::Specification.new do |spec|
  spec.name          = "montrose-rails"
  spec.version       = Montrose::Rails::VERSION
  spec.authors       = ["Ross Kaffenberger"]
  spec.email         = ["rosskaff@gmail.com"]

  spec.summary       = "Add recurring events to your Rails app"
  spec.description   = "A Rail engine for adding recurring events to Rail with helpers for models and views."
  spec.homepage      = "https://github.com/rossta/montrose-rails"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # spec.add_dependency "montrose", ">= 0.5.0"
  spec.add_dependency "railties", [">= 3.1"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rails"
  spec.add_development_dependency "rubocop", "0.45.0"
  spec.add_development_dependency "timecop"
end
