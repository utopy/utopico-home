import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'

export default class ExpensesController {

    public static async createExpense({ request, response, auth }: HttpContextContract) {

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

        return response.redirect().toRoute("v1.protected.expenses.view")
    }

}
