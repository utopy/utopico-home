import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

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

    static async updateProfile({ request, response, auth }: HttpContextContract) {

        const { firstName, lastName, email } = request.only(['firstName', 'lastName', 'email'])

        const user = auth.user as User

        try {

            user.email = email

            user.firstName = firstName

            user.lastName = lastName

            await user.save()

            return response.redirect().back()

        } catch (err) {
            return response.send(err)
        }

    }

}
