const express = require("express");
const router = express.Router();
const {Servico} = require('../models')

router.get('/', async (req, res)=>{ 
    const obj = { servicos: await Servico.findAll() }
    res.render('servicos', obj)
})


router.get('/:numServico', async (req, res) => {
    const { numServico } = req.params
    const idServico = await Servico.findByPk(numServico)
    res.send(idServico)
})

module.exports = router