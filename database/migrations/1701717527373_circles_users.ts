import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'circles_users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table.integer('user_id').unsigned().references("users.id")
            table.integer('circle_id').unsigned().references("circles.id")
            table.unique(['user_id', 'circle_id'])

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
