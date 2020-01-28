function googl(query, callback) {

    if (callback instanceof Array) throw new TypeError(callback.constructor.name + ' is not a function');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var xhr = new XMLHttpRequest

    xhr.open('GET', 'https://skylabcoders.herokuapp.com/proxy?url=https://www.google.com/search?q=' + query)

    xhr.onreadystatechange = function (res) {
        
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.readyState)
            var doc = new DOMParser().parseFromString(this.responseText, 'text/html')

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

                    if (description !== undefined && description !==null) {
                        result.description = description.innerText
                    }

                    var link = item.querySelector('.iUh30')
                    result.link = link.innerText

                    results.push(result)
                }
                else ''
                
            }

            callback(results)
        }
    }

    xhr.send()
}


// var submit = document.querySelector('button')



// submit.addEventListener('click', function(event) {

//     event.preventDefault()

//     var input = document.querySelector('input').value

//     googl(input, function(results) {
//         results.forEach(function(result) { 

//             // var item = document.createElement('li')
//             // item.innerHTML = result.title + '\t' + result.description + '\t' + '\t'
//             // document.body.ul.appendChild(item)

//             console.log(result) 
//         })
//     })
// })






// TODO create tests with just console.assert (check that each item has at least a title and a description)



// googl(input, function(results) { 

//     results.forEach(function(result) { 
//         console.log(result) 
//     })

//     console.log('%c should results have a title', 'color: green;')
//     results.forEach(function(result) {
//         console.assert(result.title !== undefined, 'result should have a title, but it doesn\'t')
//    })

//     console.log('%c should results have a description', 'color: green;')
//     results.forEach(function(result) {
//         console.assert(result.description !== undefined, 'result should have a description, but it doesn\'t')
//     })

//     console.log('%c should results show a rating, in case they have one', 'color: green;')
//     results.forEach(function(result) {
//         if (results.rating)
//             console.assert(result.rating !== undefined, 'result should have a description, but it doesn\'t')
//     })

//     console.log('%c should results have a link', 'color: green;')
//     results.forEach(function(result) {
//         console.assert(result.link !== undefined, 'result should have a link, but it doesn\'t')
//     })

//     console.log('%c should results be objects', 'color: green;')
//     results.forEach(function(result) {
//         console.assert(result instanceof Object, 'result should be an object but it isn\'t')
//     })

//     console.log('%c should each key of results be a string', 'color: green;')
//     results.forEach(function(result) { 
//         console.assert(typeof result.title === 'string', 'result should be a string but it isn\'t')
//         console.assert(typeof result.description === 'string', 'result should be a string but it isn\'t')
//         if (result.ranking !== undefined) console.assert(typeof result.rating === 'string', 'result should be a string but it isn\'t')
//     })
// })