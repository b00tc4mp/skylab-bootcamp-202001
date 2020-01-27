//var input = document.querySelector('input').value

googl('pepito', function(results) { 

        // for (var i = 0; i<results.length; i++) {
        //     for (var j = 0; j<result.length)
        // }
    results.forEach(function(result) { 
        console.log(result) 
    })

    results.forEach(function(result) {
        console.log('should result have a title')
        console.assert(result.title !== undefined, 'result should have a title, but it doesn\'t')
        console.log('should result have a description')
        console.assert(result.description !== undefined, 'result should have a description, but it doesn\'t')
     })
})