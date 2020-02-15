function createQueryString(query) {
    let qs = ''

    const keys = Object.keys(query)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (query[key] !== "") {

            qs += `${key}=${query[key]}&`
        }
    }
    return qs.substring(0, qs.length - 1)
}


