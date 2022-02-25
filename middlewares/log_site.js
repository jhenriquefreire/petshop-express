const fs = require ('fs')
function logSite(req, res, next){
    fs.appendFileSync('log.txt', "O usuário entrou na URL: " + req.url + '\n')
    next()
}


module.exports = logSite