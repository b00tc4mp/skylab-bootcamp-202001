function bodyParser(req, res, next) {
  
  var data = "";
  req.on('data', function(chunk){ data += chunk})

  req.on('end', function(){
    const body = {}
    
    data.split('&').forEach(ele => {
      const [key, value] = ele.split("=")
      body[key] = value
    })

    req.body = body
    next()
  })
}

module.exports = bodyParser