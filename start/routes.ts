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
import CirclesController from 'App/Controllers/Http/CirclesController'
import ExpensesController from 'App/Controllers/Http/ExpensesController'
import PagesController from 'App/Controllers/Http/PagesController'
import UsersController from 'App/Controllers/Http/UsersController'

Route.group(() => {

    Route.get("/login", PagesController.login).as("login")

    Route.post("/login", UsersController.login).as("loginRequest")

    Route.get("/register", PagesController.register).as("register")

    Route.post("/register", UsersController.register).as("registerRequest")

    Route.group(() => {

        Route.get("/", PagesController.homePage).as("home")

        Route.group(() => {

            Route.get("/", PagesController.profile).as("view")

            Route.post("/", UsersController.updateProfile).as("update")

        }).as("profile").prefix("/profile")

        Route.group(() => {

            Route.get("/", PagesController.expenses).as("view")

            Route.group(() => {

                Route.get("/", PagesController.newExpense).as("view")

                Route.post("/", ExpensesController.createExpense).as("create")

            }).as("new").prefix("/new")

            Route.get("/:id", PagesController.expenseDetails).as("details")


        }).as("expenses").prefix("/expenses")

        Route.group(() => {

            Route.get("/", PagesController.circles).as("view")

            Route.group(() => {

                Route.get("/", PagesController.newCircle).as("view")

                Route.post("/", CirclesController.createCircle).as("create")

            }).as("new").prefix("/new")

            Route.group(() => {

                Route.get("/", PagesController.circle).as("view")

                Route.group(() => {

                    Route.group(() => {

                        Route.get("/", PagesController.newCircleExpense).as("view")

                        Route.post("/", CirclesController.createCircleExpense).as("create")

                    }).as("new").prefix("/new")

                    Route.get("/:expenseSlug", PagesController.circleExpense).as("expense")


                }).as("expenses").prefix("/expenses")

            }).as("circle").prefix("/:slug")

        }).as("circles").prefix("/circles")

    }).as("protected").middleware(['auth'])

}).as("v1")
