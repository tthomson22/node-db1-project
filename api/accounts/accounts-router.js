const express = require('express')
const { checkAccountId } = require('./accounts-middleware')
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

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
