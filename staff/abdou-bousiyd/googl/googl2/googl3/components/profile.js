function createProfile(selector, props) {
    
    var profile = document.querySelector(selector) 

    var inputs = profile.querySelectorAll('input')

    var userInfo = null

    
    profile.addEventListener('submit', function(e) {
        e.preventDefault()
        
        var name = this.name.value
        var surname = this.surname.value
        var username = this.username.value
        var password = this.password.value

        userInfo.name = name
        userInfo.surname = surname
        userInfo.username = username
        userInfo.password = password
        
        props.onSubmit(name, surname, username, password, loggedUser.id)
        this.classList.toggle('edit-profile--hide')

    })
    
    profile.toggle = function() {
        this.classList.toggle('edit-profile--hide')
        userInfo = loggedUser

        inputs[0].value = userInfo.name
        inputs[1].value = userInfo.surname
        inputs[2].value = userInfo.username
        inputs[3].value = userInfo.password
    }

    return profile
}