import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    static async login({ request, response, auth }: HttpContextContract) {

        const { email, password } = request.only(["email", "password"])

        try {

            await auth.attempt(email, password)

            return response.redirect("/")

        } catch (err) {

            return response.redirect("/login?error=wrong_credentials")

        }

    }

}
