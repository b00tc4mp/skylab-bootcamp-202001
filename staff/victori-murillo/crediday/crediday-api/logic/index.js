module.exports = {
  registerCompany: require('./company/register-company'),
  retrieveCompany: require('./company/retrieve-company'),
  retrieveAllCompanies: require('./company/retrieve-all-companies'),
  
  registerUser: require('./user/register-user'),
  authenticateUser: require('./user/authenticate-user'),
  retrieveUser: require('./user/retrieve-user'),
  retrieveAllUsers: require('./user/retrieve-all-users'),

  registerCredit: require('./credit/register-credit'),
  
}