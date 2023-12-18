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

    /*static async circle({ request, view, auth }: HttpContextContract) {
  
      const slug = request.param("slug")
  
      const circle = (await Circle.query()
        .where("slug", slug)
        .preload("users")
        .preload('expenses', expense => {
          expense.preload("category")
          expense.preload("user")
        }))[0]
  
      const categories = await ExpenseCategory.all()
  
      const monthlyTotal = circle.expenses.filter(expense => expense.type === "loss").reduce((prev, curr) => prev + curr.ammount, 0)
      const personalMonthlyTotal = circle.expenses.filter(expense => expense.userId === auth.user!.id).reduce((prev, curr) => prev + curr.ammount, 0)
      const personalMonthlyGains = circle.expenses.filter(expense => expense.userId === auth.user!.id && expense.type === "gain").reduce((prev, curr) => prev + curr.ammount, 0)
  
      const proCapite = monthlyTotal / circle.users.length
  
      const categoriesPerentages: { [key: string]: Expense[] } = {
  
      }
      const _categoriesPerentages: { [key: string]: number } = {
  
      }
  
      categories.forEach(category => {
        categoriesPerentages[category.name] = []
      })
  
      circle.expenses.forEach(expense => {
        const { name } = expense.category
        categoriesPerentages[name].push(expense)
      })
  
      Object.keys(categoriesPerentages).forEach(cat => {
        _categoriesPerentages[cat] = Math.round(categoriesPerentages[cat].filter(exp => exp.type === "loss")
          .reduce((prev, curr) => {
            return prev + curr.ammount
          }, 0) / monthlyTotal * 100)
      })
  
      console.log(_categoriesPerentages)
  
      return view.render("pages/circles/circle", {
        slug,
        categories,
        circle: circle,
        expenses: circle.expenses,
        monthlyTotal,
        personalMonthlyTotal,
        personalMonthlyGains,
        proCapite,
        percentages: _categoriesPerentages
      })
    }*/

    static async circle({ request, view, auth }: HttpContextContract) {

        const slug = request.param("slug")

        const user = auth.user!

        // const circle = await Circle.findBy("slug", slug)

        // if (!circle) return response.redirect("/")

        // await circle.load("expenses")

        // const expenses = circle.expenses

        const circle = (await Circle.query()
            .where("slug", slug)
            .preload('expenses', expense => {
                expense.where("expenses.created_at", ">", (DateTime.local().startOf("month").toSQLDate())!)
                expense.preload("category")
                expense.preload("user")
                expense.preload("partecipants")
            }))[0]

        const monthlyTotal = circle.expenses.filter(expense => expense.type === "loss").reduce((prev, curr) => prev + curr.ammount, 0)

        const userExpenses = circle.expenses.filter((expense) => {
            return expense.partecipants.map(p => p.id).includes(user.id)
        })

        const userTotal = userExpenses.reduce((prev, curr) => prev + curr.ammount / curr.partecipants.length, 0)


        return view.render("pages/circles/circle", {
            slug,
            circle: circle,
            expenses: circle.expenses,
            monthlyTotal,
            proCapite: userTotal
        })
    }

    static async circleExpense({ request, response }: HttpContextContract) {

        const slug = request.param("slug")

        const expenseSlug = request.param("expenseSlug")

        // const circle = (await Circle.query()
        //     .where("slug", slug)
        //     .preload('expenses', expense => {
        //         expense.preload("category")
        //         expense.preload("user")
        //         expense.preload("partecipants")
        //     }))[0]

        const circle = await Circle.findBy("slug", slug)

        if (!circle) return response.redirect("/")

        const expense = (await circle.related("expenses").query().where("slug", expenseSlug))[0]

        await expense.load("partecipants")
        await expense.load("category")
        await expense.load("user")

        return expense

        // return view.render("pages/circles/expenses/expense"{
        //   circle,
        //   expenses
        // })
    }

    static async newCircle({ view }: HttpContextContract) {
        return view.render("pages/circles/new")
    }

    static async newCircleExpense({ request, response, view }: HttpContextContract) {

        const categories = await ExpenseCategory.all()

        const slug = request.param("slug")

        const circle = await Circle.findBy("slug", slug)

        await circle!.load("users")
        await circle!.load("expenses")

        if (!circle) return response.redirect("/")

        console.log(circle.users.map(el => el.toJSON()))

        return view.render("pages/circles/expenses/new", {
            categories: categories,
            circle: circle.serialize(),
            members: circle.users,
            membersString: JSON.stringify(circle.users.map(user => user.toJSON())),
        })

    }

    static async expenses({ view, auth }: HttpContextContract) {

        const expenses = await Expense.query().preload("user").preload("partecipants").preload("category").where(query => {
            query.where("user_id", "=", auth.user!.id)
            query.andWhere("created_at", ">", (DateTime.local().startOf("month").toSQLDate())!)
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
