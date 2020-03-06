export default async function () {

    const retrieve = await fetch(`http://localhost:8085/eventslast`)

    const res = await retrieve.json()

    const results = await res

    return results
}