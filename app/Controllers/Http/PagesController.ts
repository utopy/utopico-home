import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {

    static async homePage({ view }: HttpContextContract) {
        console.log("home")
        return view.render("pages/dashboard", {})
    }

    static async login({ view }: HttpContextContract) {
        console.log("login")
        return view.render("pages/login", {})
    }


}
