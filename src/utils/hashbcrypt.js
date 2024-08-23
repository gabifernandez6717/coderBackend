const bcrypt = require('bcrypt')
const createHash = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10))// Hashea a travez de un salt (string) de 10 caracteres
const isValid = (password, user) => bcrypt.compareSync(password, user.password)// Retorna true o false
module.exports = {createHash, isValid}