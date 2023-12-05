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

    static async register({ request, response, auth }: HttpContextContract) {

        const {
            email, firstName, lastName, password, password2, username
        } = request.only(['email', 'firstName', 'lastName', 'password', 'password2', 'username'])

        if (password != password2) {
            return response.redirect().back()
        }

        const user = new User()

        user.email = email
        user.firstName = firstName
        user.lastName = lastName
        user.password = password
        user.username = username

        await user.save()

        await auth.use("web").login(user)

        return response.redirect().toRoute("v1.protected.home")

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
