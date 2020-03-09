const API_URL = process.env.REACT_APP_API_URL

async function publishToilet(place) {
    let coordinates
    
    navigator.geolocation.getCurrentPosition(function (err, pos) {
        coordinates = [{
            latitude: pos.coords.longitude,
            longitude: pos.coords.longitude
        }]
    })

    const response = await fetch(`${API_URL}/:id/publish-toilet`)
}