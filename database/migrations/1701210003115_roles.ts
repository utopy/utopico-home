import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Roles } from 'App/Enums/Roles'

export default class extends BaseSchema {
    protected tableName = 'roles'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string("role")

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })


        this.defer(async db => {
            db.table(this.tableName).multiInsert([
                {
                    id: Roles.admin,
                    role: "admin",
                },
                {
                    id: Roles.user,
                    role: "user",
                },
                {
                    id: Roles.guest,
                    role: "guest",
                }
            ])
        })

    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
