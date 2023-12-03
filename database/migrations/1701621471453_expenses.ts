import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'expenses'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table.string("name").notNullable()

            table.string("slug").notNullable().unique()

            table.text("description").defaultTo("")

            table.integer("ammount").unsigned()

            table.string("type").notNullable().defaultTo("loss")

            table.integer("expense_category_id").unsigned().defaultTo(null).references("expense_categories.id")


            table.integer("user_id").unsigned().defaultTo(null).references("users.id")



            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
