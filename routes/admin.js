const express = require("express")
const multer = require('multer')
const {Servico} = require('../models')

const router = express.Router()
const upload = multer({
    dest: 'public/uploads/'
})

const loginChk = (req, res, next) => {
  if (!req.session.login) {
    res.redirect('/login')
    return
  }
  next()
}

router.use(loginChk)

router.get('/', (req, res) => res.render('admin/dashboard-admin'))

router.get('/servicos', async (req, res) => { 
    const obj = {
      servicos: await Servico.findAll()
    }
    res.render('admin/servicos-admin', obj)
})

router.get('/servicos/criar', (req, res) => res.render('admin/criar-servico'))

const validaServico = (req, res, next) => {
  if(!req.body.nome || !req.body.descricao || !req.body.valor) {
    res.render('erro-validacao', { mensagemErro: 'Preencha todos os campos' })
    return
  }
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }
  if(req.body.descricao.length <= 10) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho da descrição deve ser maior do que 3 caracteres' })
    return
  }
  if(isNaN(req.body.valor)) {
    res.render('erro-validacao', { mensagemErro: 'O preço não é um número válido' })
    return
  }
  next()
}

router.post('/servicos/criar', validaServico, upload.single('imgServico'), async (req, res) => {
//    req.body.img = req.file.filename
    await Servico.create(req.body)
    res.redirect('/admin/servicos')
})

router.get('/meus-dados', (req, res) => res.render('admin/meus-dados'))

router.get('/servicos/:idServico/remover', async (req, res) => {
    console.log('removendo serviço '+req.params.idServico)

    await Servicos.destroy({where: {id: req.params.idServico}})
    res.redirect('/admin/servicos')
})

router.get('/servicos/:idServico/editar', async (req, res) =>{

  const servico = await Servico.findByPk(req.params.idServico)

  if (!Servico){
    res.render('erro-validacao', {mensagemErro: 'Serviço não existe'})
  }
  const obj = { servico: servico }

    res.render('admin/editar-servico', obj)
})

router.post('/servicos/:idServico/editar', async (req, res) =>{

  await Servico.Update(req.body, {where:
    {id: req.params.idServico}
  })
    res.redirect('/admin/servicos')
})

module.exports = router