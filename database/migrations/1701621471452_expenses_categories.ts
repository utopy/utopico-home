import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { CategoriesToObject } from 'App/Enums/Categories'

export default class extends BaseSchema {
    protected tableName = 'expense_categories'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table.string("name").notNullable()

            table.text("description").defaultTo(null)

            table.string("icon_name")

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })

        this.defer(async db => {


            await db.table(this.tableName)
                .multiInsert(CategoriesToObject())

        })

    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
