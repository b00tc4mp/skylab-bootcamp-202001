'use strict';

var IT = "🎈🤡";

function App(props){
  var app = document.createElement("main");

  app.innerHTML = "<h1>" + props.title + "</h1>";



  var _login = Login({
     onSubmit: function(username, password){
        try{
            authentication(username, password);

            _login.replaceWith(_googl);
        }catch(error){
          if(error instanceof TypeError){
            return alert("Sorry, something wrong")
          }
            alert( error.message + ", you cannot get in " + IT);
        }
     },
     onToRegister: function(){
        _login.replaceWith(_register);
     }
  });


  var _register = Register({
      onSubmit: function(name, surname, username, password){
        try{
            register(name, surname, username, password);

            _register.replaceWith(_login);
        } catch(error){
            alert(error.message + " " + IT);
        }
      },
      onToLogin: function(){
        _register.replaceWith(_login);
      }
    });

  app.append(_login);


  var _googl = Search({
      title: "Googl",

      onSubmit: function(query){
          googl(query, function(results){
              if (results instanceof Error) return alert(results.message + " " + IT);

              var _results = Results({results: results})

              if (!_googlResults)
                app.append(_googlResults = _results);
              else {
                _googlResults.replaceWith(_results);
                
                _googlResults = _results;
              }
          });
      }

  });
  var _googlResults;

  return app;
}
  

var _ecosia = createSearch("search-2", function(query){
  ecosia(query, function(results){
    createResults(".results-2", results);
  });
});

var _bing = createSearch("search-3", function(query){
  bing(query, function(results){
    createResults(".results-3", results);
  });
});


var _yahoo = createSearch("search-4", function(query){
  yahoo(query, function(results){
    createResults(".results-4", results);
  });
});

