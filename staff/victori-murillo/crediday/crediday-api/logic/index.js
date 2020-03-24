module.exports = {
  registerCompany: require('./company/register-company'),
  retrieveCompany: require('./company/retrieve-company'),
  retrieveAllCompanies: require('./company/retrieve-all-companies'),
  confirmCompany: require('./company/confirm-company'),
  
  registerUser: require('./user/register-user'),
  authenticateUser: require('./user/authenticate-user'),
  retrieveUser: require('./user/retrieve-user'),
  retrieveAllUsers: require('./user/retrieve-all-users'),
  updateUser: require('./user/update-user'),
  deleteUser: require('./user/delete-user'),
  confirmDataToRecoverPassword: require('./user/confirm-data-to-recover-password'),
  confirmVerificationCode: require('./user/confirm-verification-code'),
  updatePasswordCode: require('./user/update-password-code'),

  registerCredit: require('./credit/register-credit'),
  retrieveCredit: require('./credit/retrieve-credit'),
  retrieveCreditsByUser: require('./credit/retrieve-credits-by-user'),
  retrieveCreditsByCompany: require('./credit/retrieve-credits-by-company'),

  registerPayment: require('./payment/register-payment'),
  
}