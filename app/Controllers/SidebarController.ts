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
	routeName: "v1.protected.home",
	icon: {
		className: "material-symbols-outlined",
		value: "space_dashboard",
	},
	current: false,
	role: Roles.user
}, {
	name: "circles",
	label: "Cerchie",
	routeName: "v1.protected.circles.view",
	icon: {
		className: "material-symbols-outlined",
		value: "circles"
	},
	current: false,
	role: Roles.user
}, {
	name: "expenses",
	label: "spese",
	routeName: "v1.protected.expenses.view",
	icon: {
		className: "material-symbols-outlined",
		value: "calculate",
	},
	current: false,
	role: Roles.user
}, {
	name: "messages",
	label: "Messaggi",
	routeName: "v1.protected.home",
	icon: {
		className: "material-symbols-outlined",
		value: "inbox",
	},
	current: false,
	role: Roles.admin
}, {
	name: "goals",
	label: "Obiettivi",
	routeName: "v1.protected.home",
	icon: {
		className: "material-symbols-outlined",
		value: "flag_circle",
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

