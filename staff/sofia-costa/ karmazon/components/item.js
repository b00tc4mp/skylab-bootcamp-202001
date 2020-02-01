function Item(result) {
    
    var item = document.createElement('li');

    Component.call(this, item);

    var name = document.createElement('h3');
    name.innerText = result.name;
    item.append(name)
    
    var image = document.createElement('img');
    image.src = result.thumbnail;
    item.append(image)

    var price = document.createElement('span');
    price.innerText = result.price;
    item.append(price)
            
    item.addEventListener('click', function(event) {
        event.preventDefault()

        retrieveVehicle(result.id, function(details) {

            var detail = new Detail(details)

            var list = document.querySelector('ul')
            list.replaceWith(detail.container)
        })
    })

}

Item.prototype = Object.create(Component)
Item.prototype.constructor = Item