import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'
import ExpenseCategory from 'App/Models/ExpenseCategory'

export default class PagesController {

    static async homePage({ view }: HttpContextContract) {
        console.log("home")
        return view.render("pages/dashboard", {})
    }

    static async login({ view }: HttpContextContract) {
        console.log("login")
        return view.render("pages/login", {})
    }

    static async profile({ view }: HttpContextContract) {

        return view.render("pages/profile", {
        })
    }

    static async expenses({ view }: HttpContextContract) {

        const expenses = await Expense.query().preload("user").preload("category")

        return view.render("pages/expenses/index", {
            expenses
        })

    }

    static async expenseDetails({ params }: HttpContextContract) {

        const expense = await Expense.find(params.id)

        return expense

        // return view.render("pages/expenses/index", {
        //     expense
        // })

    }

    static async newExpense({ view }: HttpContextContract) {

        const categories = await ExpenseCategory.all()

        console.log(categories)

        return view.render("pages/expenses/new", {
            categories: categories
        })

    }


}
