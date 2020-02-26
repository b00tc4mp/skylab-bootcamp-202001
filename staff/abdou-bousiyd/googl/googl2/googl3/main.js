
var _login = createLogin('form.login', {
    onSubmit: function(username, password) {

        try {
            // debugger
            authenticate(username, password)
            _login.toggle()
            _googl.toggle()
            _bing.toggle()
            _profile.toggle()
        }catch (error) {
            alert('Credenciales incorrectas')
        }
    },
    onToRegister: function() {
        _login.toggle()
        _register.toggle()
    }
})

var _register = createRegister('form.register', {

    onSubmit: function(name, surname, username, password) {
        try {
            register(name, surname, username, password)
            _register.toggle()
            _login.toggle()
        } catch (error) {
            alert('Error al registrar')
        }
    },
    onToLogin: function() {
        _register.toggle()
        _login.toggle()
    }
})

var _profile = createProfileLink('.profile', {
    onToProfile: function() {
        _googl.toggle()
        _bing.toggle()
        _edit_profile.toggle()
    }
})

var _edit_profile = createProfile('form.edit-profile', {
    onSubmit: function(name, surname, username, password, id) {
        try {
            editProfile(name, surname, username, password, id)
            _googl.toggle()
            _bing.toggle()
        } catch (error) {
            alert('Error al editar')
        }
    }
})



var _googl = createSearch('form.googl', {
    onSubmit: function(query) {
        googl(query, function(results){
            if (results instanceof Error) return alert('No hay resultados');
            createResults('ul.googl', results)
        })
    }
})

var _bing = createSearch('form.bing', {
    onSubmit: function(query) {
        bing(query, function(results){
            createResults('ul.bing', results)
        })
    }
})