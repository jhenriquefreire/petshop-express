var express = require('express');
var router = express.Router();
var {Usuario, Servico} = require('../models')
const sobre =  (req, res, next) => {console.log ('Rodando Middleware do /sobre'), next()}


/* GET home page. */
router.get('/', async (req, res, next) => {
        const obj = {
            servicos: await Servico.findAll()
        }
    res.render('index', obj);
})

router.get('/sobre', sobre, (req, res, next) => res.render('sobre'))

router.get('/cadastro', (req, res, next) => res.render('cadastro'))

router.get('/contato', (req, res, next) => res.render('contato'))

router.get('/login', (req, res, next) => res.render('login'))

router.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
})

router.post('/cadastro', async (req, res, next) => {
  await Usuario.create(req.body)
  res.redirect('/admin/login')
})

router.post('/login', async (req, res, next) => 
    {const usuarioLogin = await Usuario.findOne({
      where:{login: req.body.email}
    })
    if(usuarioLogin && usuarioLogin.senha == req.body.senha) {
      req.session.estaLogado = true
      req.session.usuarioLogado = usuarioLogin
      res.redirect('/admin')
    } else {
      res.render('erro-validacao', { mensagemErro: 'Senha inválida' })
    }
  })

module.exports = router;