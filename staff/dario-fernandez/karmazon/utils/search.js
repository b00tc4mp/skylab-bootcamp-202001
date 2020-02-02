'use strict'

function search(url, itemSelector, titleSelector, linkSelector, descriptionSelector, callback){
    call('https://skylabcoders.herokuapp.com/proxy?url=' + url, function(response) {
        if(response instanceof Error) {
            return callback(response)
        }

        var data = JSON.parse(response.content)
        
        callback(data)   
    }
)
}