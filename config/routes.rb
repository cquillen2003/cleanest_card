CleanestCard::Application.routes.draw do
	
	root :to => 'sessions#new'
	
  get "boards/plan", :as => :plan

  get "boards/current", :as => :current

  resources :users
  resources :sessions#, :defaults => {:format => :json}, only: [:new, :create, :destroy]
  
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  
  resources :assignments
  
  #resources :projects do
  #	resources :tasks, :controller => 'project_tasks' do
  #		collection do
  #			put :mass_update
  #		end
  #	end
  #end

  #post "projects/:id/split", :to => "projects#split", :as => :split_project

  #put "projects/:id/plan", :to => "projects#plan"

  #resources :tasks #Needed for stand-alone tasks (not tied to project)

  resources :categories, :defaults => {:format => :json}

  resources :items, :defaults => {:format => :json} do
    #collection do
      #put :link_items #Add tasks from items
    #end
    resources :items, :as => 'tasks', :controller => 'tasks', :defaults => {:format => :json}
  end

  post "items/:id/split", :to => "items#split", :as => :split_item

  put "items/:id/plan", :to => "items#plan"


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
