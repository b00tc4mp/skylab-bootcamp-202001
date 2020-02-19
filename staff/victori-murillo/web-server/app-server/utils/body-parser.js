function bodyParser(req, res, next) {
  
  var data = "";
  req.on('data', function(chunk){ data += chunk})

  req.on('end', function(){

    const body = {}
    
    data.split('&').forEach(ele => {
    
      const key = ele.split("=")[0]
      const value = ele.split("=")[1]
      body[key] = value
    })

    req.body = body
    next()
  })
}

module.exports = bodyParser