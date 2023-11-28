import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Roles } from '../../app/Enums/Roles'

export default class extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table.string('email', 255).notNullable().unique()

            table.string("username", 15).notNullable().unique()

            table.string("first_name").notNullable().defaultTo("GiovannƏ")

            table.string("last_name").notNullable().defaultTo("GiorgiƏ")

            table.string('password', 180).notNullable()

            table.string('remember_me_token').nullable()

            table.boolean("god_mode").notNullable().defaultTo(false)

            table.boolean("verified").notNullable().defaultTo(false)

            table.integer("role_id").unsigned().defaultTo(Roles.user).references("roles")


            /**
             * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).notNullable()
            table.timestamp('updated_at', { useTz: true }).notNullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
