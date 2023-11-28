//import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

import { Roles } from "App/Enums/Roles"

type Page = {
	name: string,
	label: string,
	routeName: string,
	icon: {
		className: string,
		value: string,
	}
	current: boolean,
	role: number
}

const pages: Page[] = [{
	name: "dashboard",
	label: "Dashboard",
	routeName: "admin.protected.dashboard",
	icon: {
		className: "material-symbols-outlined",
		value: "space_dashboard",
	},
	current: false,
	role: Roles.user
}, {
	name: "quotes",
	label: "Preventivi",
	routeName: "admin.protected.quotes.index",
	icon: {
		className: "material-symbols-outlined",
		value: "request_quote",
	},
	current: false,
	role: Roles.admin
}, {
	name: "calculator",
	label: "Calcolatore stima",
	routeName: "admin.protected.calculator.index",
	icon: {
		className: "material-symbols-outlined",
		value: "calculate",
	},
	current: false,
	role: Roles.admin
}, {
	name: "messages",
	label: "Messaggi",
	routeName: "admin.protected.messages.messages",
	icon: {
		className: "material-symbols-outlined",
		value: "inbox",
	},
	current: false,
	role: Roles.admin
}, {
	name: "courses",
	label: "Corsi",
	routeName: "admin.protected.courses",
	icon: {
		className: "material-symbols-outlined",
		value: "school",
	},
	current: false,
	role: Roles.user
}]

export default class SidebarController {
	static pages: Page[] = pages

	static setCurrentPage(pageName: string) {
		const _raw = pageName.split(".")
		// const name = _raw[_raw.length - 1]
		this.pages.forEach(page => {

			const c = _raw.includes(page.name)

			console.log(c)
			page.current = c
			return
		})
	}

}

