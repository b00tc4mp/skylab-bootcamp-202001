module.exports = (err, req, res, next) => {
  let { message, name } = err

  let status = 400
  let error = 'error'

  if (name === 'CastError') message = 'Invalid id'

  if (name === 'ValidationError') {
    message = Object.values(err.errors).map(value => value.message)

    if (message.length > 1) error = 'errors'
    if (message.length === 1) message = message[0]
  }

  if (name === 'ContentLength') status = 411

  res.status(status).json({ [error]: message })
}


/*
Client error responses
400 Bad Request
The server could not understand the request due to invalid syntax.
401 Unauthorized
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
402 Payment Required 
This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.
403 Forbidden
The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server.
404 Not Found
The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
405 Method Not Allowed
The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
*/