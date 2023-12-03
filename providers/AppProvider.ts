import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import SidebarController from 'App/Controllers/SidebarController'

export default class AppProvider {
    constructor(protected app: ApplicationContract) {
    }

    public register() {
        // Register your own bindings
    }

    public async boot() {
        // IoC container is ready
        const View = (await import("@ioc:Adonis/Core/View")).default
        const Route = (await import("@ioc:Adonis/Core/Route")).default
        View.global("sidebar", {
            pages: SidebarController.pages,
            adminRoute: (name: string, isProtected = true) => Route.makeUrl(`admin.${isProtected ? 'protected.' : ''}${name}`)
        })

    }

    public async ready() {
        // App is ready


    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
