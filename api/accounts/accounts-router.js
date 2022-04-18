const express = require('express')
const { 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique 
} = require('./accounts-middleware')
const Account = require('./accounts-model')

const router = require('express').Router()

router.get('/', async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const data = await Account.getAll()
    res.json(data)
  } catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id);
    res.json(account)
  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.create({ 
      name: req.body.name.trim(), 
      budget: req.body.budget 
    });
    res.status(201).json(newAccount);
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.updateById(req.params.id, req.pass)
    res.json(newAccount)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deleter = await Account.deleteById(req.params.id)
    res.json(deleter)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
