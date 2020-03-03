export default function () {

    return fetch(`http://localhost:8080/events`)
        .then(response => response.json())
        .then(data => {
            const { error: _error } = data
            debugger
            if (_error) throw new Error(_error)

            return data

        }
        )
}