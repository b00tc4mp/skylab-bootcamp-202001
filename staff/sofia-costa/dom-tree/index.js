var element = document.children

var elements

function getTree (elements) {

    code = '';

    for (var i = 0; i < elements.length; i++) {

        var element = elements[i]
    
    code += "<" + element.tagName + ">";

        if (element.children.length) {

            code += getTree(element.children)
            
        }

    code += "</" + element.tagName + ">";

    }
return code
}

getTree(element)