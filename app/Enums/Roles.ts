export enum Roles {
    admin = 1,
    user,
    guest
}

export function RolesToObjects() {

    const _data = Object.values(Roles)

    const data = _data.splice(0, _data.length / 2)

    return data.map((el, i) => ({
        id: i + 1,
        role: el
    }))
}
