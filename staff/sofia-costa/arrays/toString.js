var array = ['olá', 'hola', 'salut', 'ciao']

function toString (array) {
    var arr
    for (var i = 0; i<array.length; i++) {
        if (i===0) arr = array[i]
        else arr += ',' + array[i]
    }
    console.log(arr)
}