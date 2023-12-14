import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'expenses_partecipants'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.integer("expense_id").unsigned().references("expenses.id")
            table.integer("user_id").unsigned().references("users.id")
            table.unique(['user_id', 'expense_id'])

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
