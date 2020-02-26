function createRegister(selector, props) {//selector es el form.register
    console.log(selector)
    
    var register = document.querySelector(selector) //for class register --hide
    
    
    register.addEventListener('submit', function(e) {
        e.preventDefault()
        
        var name = this.name.value
        var surname = this.surname.value
        var username = this.username.value
        var password = this.password.value
        
        props.onSubmit(name, surname, username, password)
    })
    
    register.toggle = function() {
        this.classList.toggle('register--hide')
    }
    var login = register.querySelector('a')

    login.addEventListener('click', function(e){
        e.preventDefault()

        props.onToLogin()
    })
    return register
}