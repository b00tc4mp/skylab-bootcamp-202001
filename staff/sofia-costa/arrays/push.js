var array = [0,1,2,3]
var args = []

function push (array, values) {
    args=array
for (var i = 1; i < arguments.length; i++) {
    args[args.length] = arguments[i]
}
    console.log(array.length)
    return args
}

