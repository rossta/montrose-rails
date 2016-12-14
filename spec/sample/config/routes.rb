# frozen_string_literal: true
Rails.application.routes.draw do
  resources :events
  root to: "events#index"
end
