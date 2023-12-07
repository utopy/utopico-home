import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ExpenseCategory from './ExpenseCategory'
import User from './User'

import { string } from '@ioc:Adonis/Core/Helpers'

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public ammount: number

  @column()
  public type: string

  @column()
  public description: string

  @column()
  public userId: number

  @column()
  public expenseCategoryId: number

  @belongsTo(() => ExpenseCategory)
  public category: BelongsTo<typeof ExpenseCategory>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async onCreate(expense: Expense) {
    if (expense.$dirty.name) {
      expense.slug = string.dashCase(string.noCase(expense.name + " " + nanoid(4)))
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
