const jwt = require('jsonwebtoken')

const {secret} = require('../config/config')

module.exports = (req, res, next) => {
    //获取token
  let token = req.get('token')

  if(!token) {
    return res.json({
      code:'2003',
      msg: 'token 缺失',
      data: null
  })
  }
  //校验token
  jwt.verify(token, secret, (err, data) => {
    if(err) {
      return res.json({
        code:'2004',
        msg: 'token 校验失败',
        data: null
    })
    }
    //如果成功
    next()
  })
  
}