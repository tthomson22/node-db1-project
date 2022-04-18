const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id);
    if(!account){
      res.status(404).json({ message: "account not found" })
    } else {
      req.account = account;
      next()
    }
  } catch(err) {
    next(err)
  }
}