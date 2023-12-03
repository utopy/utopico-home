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
import ExpensesController from 'App/Controllers/Http/ExpensesController'
import PagesController from 'App/Controllers/Http/PagesController'
import UsersController from 'App/Controllers/Http/UsersController'

Route.group(() => {

    Route.get("/login", PagesController.login).as("login")

    Route.post("/login", UsersController.login).as("loginRequest")

    Route.group(() => {

        Route.get("/", PagesController.homePage).as("index")

        Route.group(() => {

            Route.get("/", PagesController.profile).as("view")

            Route.post("/", UsersController.updateProfile).as("update")

        }).as("profile").prefix("/profile")

        Route.group(() => {

            Route.get("/", PagesController.expenses).as("view")

            Route.get("/:id", PagesController.expenseDetails).as("details")

            Route.group(() => {

                Route.get("/", PagesController.newExpense).as("view")

                Route.post("/", ExpensesController.createExpense).as("create")

            }).as("new").prefix("/new")



        }).as("expenses").prefix("/expenses")

    }).as("protected").middleware(['auth'])

}).as("v1")
