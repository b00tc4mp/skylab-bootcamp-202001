function createProfileLink(selector, props) {
    
    var profile = document.querySelector(selector) 
    
    profile.toggle = function() {
        this.classList.toggle('profile--hide')
    }

    var profileLink = profile.querySelector('a')

    profileLink.addEventListener('click', function(e){
        e.preventDefault()

        props.onToProfile()
    })
    return profile
}