/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import PagesController from 'App/Controllers/Http/PagesController'
import UsersController from 'App/Controllers/Http/UsersController'

Route.group(() => {

    Route.get("/login", PagesController.login).as("login")

    Route.post("/login", UsersController.login).as("loginRequest")

    Route.group(() => {

        Route.get("/", PagesController.homePage).as("index")

    }).as("protected").middleware(['auth'])

}).as("v1")
