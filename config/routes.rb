Rails.application.routes.draw do
  root "home#index"
  get 'home/index'
  get 'about', to: 'home#about'
  get 'team', to: 'home#team'
  get 'contact', to: 'home#contact'
end
