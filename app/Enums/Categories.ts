export enum Categories{
    casa= 1,
    alimenti,
    extra
}

export function CategoriesToObject() {

    const _data = Object.values(Categories)

    const data = _data.splice(0, _data.length / 2)

    return data.map((el, i) => ({
        id: i + 1,
        name: el
    }))
}
