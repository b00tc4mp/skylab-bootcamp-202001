// TODO create tests with just console.assert (check that each item has at least a title and a description)
googl('pepito', function(results) { 

    results.forEach(function(result) { 
        console.log(result) 
    })

    console.log('%c should results have a title', 'color: green;')
    results.forEach(function(result) {
        console.assert(result.title !== undefined, 'result should have a title, but it doesn\'t')
   })

    console.log('%c should results have a description', 'color: green;')
    results.forEach(function(result) {
        console.assert(result.description !== undefined, 'result should have a description, but it doesn\'t')
    })

    console.log('%c should results show a rating, in case they have one', 'color: green;')
    results.forEach(function(result) {
        if (results.rating)
            console.assert(result.rating !== undefined, 'result should have a description, but it doesn\'t')
    })

    console.log('%c should results have a link', 'color: green;')
    results.forEach(function(result) {
        console.assert(result.link !== undefined, 'result should have a link, but it doesn\'t')
    })

    console.log('%c should results be objects', 'color: green;')
    results.forEach(function(result) {
        console.assert(result instanceof Object, 'result should be an object but it isn\'t')
    })

    console.log('%c should each key of results be a string', 'color: green;')
    results.forEach(function(result) { 
        console.assert(typeof result.title === 'string', 'result should be a string but it isn\'t')
        console.assert(typeof result.description === 'string', 'result should be a string but it isn\'t')
        if (result.ranking !== undefined) console.assert(typeof result.description === 'string', 'result should be a string but it isn\'t')
    })
})