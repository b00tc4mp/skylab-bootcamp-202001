const getLocation = () => {
  let lat = ''
  let lng = ''

  navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log('works')
        console.log(position)
        lat = position.coords.latitude
        lng = position.coords.longitude
    },
    function errorCallback(error) {
      console.log(error)
    },
    {
        maximumAge:Infinity,
        timeout:5000
    }
);

  return {lat, lng}
}

console.log(getLocation())

// export default getLocation