
function createLogin(selector, props) { //selector es = form.login que esta en la fun createLogin() en main
   //props para pasar f() onsubmit y ontologin
   var login = document.querySelector(selector) //le pasamos form cn class login _login--hide
   login.addEventListener('submit', function(e) {
       e.preventDefault()
       
       var username = this.username.value
       var password = this.password.value
       
       props.onSubmit(username, password)
    })
    
    login.toggle = function() {
        this.classList.toggle('login--hide')
    }
    
    var register = login.querySelector('a') //aqui register esta dentro <a href> Register

    register.addEventListener('click', function(e) {
        e.preventDefault()
        
        props.onToRegister()
    })
    return login
}