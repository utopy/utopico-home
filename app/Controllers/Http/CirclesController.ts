import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Circle from 'App/Models/Circle'

export default class CirclesController {

    public static async createCircle({ request, auth, response }: HttpContextContract) {
        const { name, description } = request.only(["name", "description"])

        const circle = new Circle()

        circle.name = name
        circle.description = description

        await circle.save()

        circle.related("users").attach([auth.user!.id])


        return response.redirect().back()
    }

}
