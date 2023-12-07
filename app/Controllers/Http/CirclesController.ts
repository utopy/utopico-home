import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Circle from 'App/Models/Circle'
import Expense from 'App/Models/Expense'
import User from 'App/Models/User'

export default class CirclesController {

  public static async createCircle({ request, auth, response }: HttpContextContract) {

    const { name, description, members } = request.only(["name", "description", 'members'])

    const circle = new Circle()

    circle.name = name
    circle.description = description


    await circle.save()

    const toInvite = (await User.query().whereIn("email", members)).map(m => m.id)

    circle.related("users").attach([auth.user!.id, ...toInvite])

    return response.redirect().back()
  }

  public static async createCircleExpense({ request, response, auth }: HttpContextContract) {

    const slug = request.param("slug")

    const circle = await Circle.findBy("slug", slug)

    if (!circle) return response.redirect("/")

    const {
      name, expense_category_id, ammount, type, description
    } = request.only(["name", "expense_category_id", "ammount", 'type', 'description'])

    const data = new Expense()

    data.name = name
    data.expenseCategoryId = expense_category_id
    data.ammount = ammount
    data.type = type
    data.description = description
    data.userId = auth.user!.id

    await data.save()
    console.log("EXPENSE:")

    circle.related("expenses").attach([data.id])



    return response.redirect().toRoute("v1.protected.expenses.view")
  }

}
