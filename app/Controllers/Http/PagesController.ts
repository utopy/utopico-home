import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
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

    static async expenses({ view, auth }: HttpContextContract) {

        const expenses = await Expense.query().preload("user").preload("category").where(query => {
            query.where("created_at", ">", (DateTime.local().startOf("month").toSQLDate())!)
        }).orderBy("created_at", "desc")

        const monthlyTotal = expenses.filter(expense => expense.type === "loss").reduce((prev, curr) => prev + curr.ammount, 0)
        const personalMonthlyTotal = expenses.filter(expense => expense.userId === auth.user!.id).reduce((prev, curr) => prev + curr.ammount, 0)

        const personalMonthlyGains = expenses.filter(expense => expense.userId === auth.user!.id && expense.type === "gain").reduce((prev, curr) => prev + curr.ammount, 0)

        return view.render("pages/expenses/index", {
            expenses,
            monthlyTotal,
            personalMonthlyTotal,
            personalMonthlyGains
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
