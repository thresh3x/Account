const express = require('express');
const router = express.Router();

const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

//导入中间件检测登录
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

/* GET home page. */
router.get('/', function(req, res, next) {
  //重定向
  res.redirect('/account')
});

//记账本列表
router.get('/account', checkLoginMiddleware, (req,res, next) => {
 


  AccountModel.find().sort({time:-1}).exec((err,data) => {
    if(err) {
      res.status(500).send('读取失败~~~')
      return;
    }
    res.render('account', {accounts: data, moment: moment})
  })
})

//提交记录
router.post('/account', checkLoginMiddleware, (req,res,next) => {
  //请求体数据
  //req.body

  //插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  },(err, data) => {
    if(err) {
      res.status(500).send('插入失败')
      return;
    }
    res.render('success', {msg: ':) 添加成功~~~', url:'/account'})
  })
 
})

//添加记录
router.get('/account/create', checkLoginMiddleware, (req,res) => {
  res.render('create')
})
router.get('/create', checkLoginMiddleware, (req,res) => {
  res.render('create')
})

//删除记录
router.get('/account/:id', checkLoginMiddleware, (req,res) => {
  let id = req.params.id;

  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
      res.status(500).send('删除失败~~~')
      return;
    }
    res.render('success', {msg:'删除成功~~',url:'/account'})
  })
})

module.exports = router;
