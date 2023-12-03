import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'
import { Roles } from 'App/Enums/Roles'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public email: string

    @column()
    public firstName: string

    @column()
    public lastName: string

    @column()
    public godMode: boolean

    @column()
    public verified: boolean

    @column()
    public roleId: number

    @column({ serializeAs: null })
    public password: string

    @column()
    public rememberMeToken: string | null

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    @computed()
    public get role() {
        return Roles[this.roleId]
    }

    @computed()
    public get fullName() {
        return this.firstName + " " + this.lastName
    }


    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}
