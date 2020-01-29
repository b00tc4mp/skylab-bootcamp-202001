function search ()


if(this.status === 200) {
    // console.log(this.readyState)
    var doc = new DOMParser().parseFromString(this.responseText, 'text/html')
    // console.log(this.responseText)

    var items = doc.querySelectorAll('div.g')

    var results = []

    for (var i = 0; i < items.length; i++) {
        var item = items[i]

        var title = item.querySelector('h3.LC20lb')

        if (title) {
            var result = {}

            result.title = title.innerText
            var rating = item.querySelector('.slp.f')

            if (rating) {
                result.rating = rating.innerText
            }

            var description = item.querySelector('.st')

            if (description) {
                result.description = description.innerText
            }

            var link = item.querySelector('.iUh30')
            result.link = link.href.trim()

        }
        results.push(result)
        
    }
    
    callback(results)
}