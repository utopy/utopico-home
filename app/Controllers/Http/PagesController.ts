import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Expense from 'App/Models/Expense'
import ExpenseCategory from 'App/Models/ExpenseCategory'
import Circle from 'App/Models/Circle'

export default class PagesController {

    static async homePage({ view }: HttpContextContract) {
        return view.render("pages/dashboard", {})
    }

    static async login({ view }: HttpContextContract) {
        return view.render("pages/login", {})
    }

    static async register({ view }: HttpContextContract) {
        return view.render("pages/register", {})
    }

    static async profile({ view }: HttpContextContract) {

        return view.render("pages/profile", {
        })
    }

    static async circles({ view, auth }: HttpContextContract) {

        const user = auth.user!

        await user.load("circles")

        return view.render("pages/circles/index", {
            userCircles: user.circles
        })
    }

    static async circle({ request, view, response }: HttpContextContract) {

        const slug = request.param("slug")

        // const circle = await Circle.findBy("slug", slug)

        // if (!circle) return response.redirect("/")

        // await circle.load("expenses")

        // const expenses = circle.expenses

        const circle = (await Circle.query()
            .where("slug", slug)
            .preload('expenses', expense => {
                expense.preload("category")
                expense.preload("user")
            }))[0]

        console.log(circle.serialize())

        return view.render("pages/circles/circle", {
            slug,
            circle: circle,
            expenses: circle.expenses
        })
    }

    static async newCircle({ view }: HttpContextContract) {
        return view.render("pages/circles/new")
    }

    static async newCircleExpense({ request, response, view }: HttpContextContract) {

        const categories = await ExpenseCategory.all()

        const slug = request.param("slug")

        const circle = await Circle.findBy("slug", slug)

        if (!circle) return response.redirect("/")

        return view.render("pages/circles/expenses/new", {
            categories: categories,
            circle: circle.serialize()
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
