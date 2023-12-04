import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

import { string } from '@ioc:Adonis/Core/Helpers'

export default class Circle extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public slug: string

    @column()
    public description: string

    @beforeCreate()
    public static async onCreate(circle: Circle) {
        if (circle.$dirty.name) {
            circle.slug = string.dashCase(string.noCase(circle.name + " " + circle.id))
        }
    }

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

}
