const db = require('../../data/db-config');
const Account = require('./accounts-model')

exports.checkAccountPayload = async(req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  try{
    if(!name || budget === undefined){
      res.status(400).json({ message: "name and budget are required" })
    } else if( name.trim().length < 3 || name.trim().length > 100 ) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else if(typeof budget !== "number"){
      res.status(400).json({ message: "budget of account must be a number" })
    } else if(budget < 0 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    } else {
      req.pass = { name, budget }
      next()
    }
  } catch(err) {
    next(err)
  }
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const findName = await db('accounts')
      .where('name', req.body.name.trim())
      .first();
    if(!findName){
      next()
    } else {
      res.status(400).json({ message: "that name is taken" })
    }
  } catch(err) {
    next(err)
  }
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