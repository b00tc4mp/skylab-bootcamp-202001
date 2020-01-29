function call (url, callback) {

    var xhr = new XMLHttpRequest

    xhr.open('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=' + query)

    xhr.onreadystatechange = function (response) {
        
        if (this.readyState === 4) {

        }
    }
    xhr.send()
}