import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'

import { string } from '@ioc:Adonis/Core/Helpers'
import User from './User'
import Expense from './Expense'

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
    console.log(circle)
    if (circle.$dirty.name) {
      circle.slug = string.dashCase(string.noCase(circle.name + " " + nanoid(4)))
    }
  }

  @manyToMany(() => User, {
    pivotTable: "circles_users",
    pivotTimestamps: true
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Expense, {
    pivotTable: "circles_expenses",
    pivotTimestamps: true
  })
  public expenses: ManyToMany<typeof Expense>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
