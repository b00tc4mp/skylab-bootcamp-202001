function Item(results,onClick){

    var item = document.createElement('li');
    item.classList.add('results__item');

    Component.call(this,item);


    var title = document.createElement('h3');
    title.classList.add('results__title');
    title.innerText = results.name;
    item.append(title);

    var image = document.createElement('img');
    image.src = results.thumbnail;
    item.append(image);

    var price = document.createElement('span');
    price.classList.add('results__price');
    price.innerText = 'pvp: '+results.price + '€';
    item.append(price);

    item.addEventListener('click',function(){
        var id = results.id;

        onClick(id);
    })
}

Item.prototype = Object.create(Component);
Item.prototype.constructor = Item;