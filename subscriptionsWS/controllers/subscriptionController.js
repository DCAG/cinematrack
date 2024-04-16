const express = require('express')
const subscriptionService = require("../services/subscriptionService")

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const data = await subscriptionService.getAll()
        res.send(data)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/:id', async (req,res) => {
    try{

        const {id} = req.params
        const data = await subscriptionService.getById(id)
        res.send(data)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const data = await subscriptionService.create(body)
        res.status(201).send(data)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await subscriptionService.remove(id)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await subscriptionService.update(id,objectToUpdate)
        res.send(result)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router