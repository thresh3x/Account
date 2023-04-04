const express = require('express');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

/* GET home page. */
router.get('/', checkTokenMiddleware, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//记账本列表
router.get('/account',checkTokenMiddleware, (req,res, next) => {
    AccountModel.find().sort({time:-1}).exec((err,data) => {
      if(err) {
        res.json({
          code: '1001',
          msg: '读取失败',
          data: null
        })
        return;
      }
      res.json({
          //响应编号
          code: '0000',
          //响应信息
          msg: '读取成功',
          //响应数据
          data: data
      })
    })

})

//创建账单
router.post('/account', checkTokenMiddleware, (req,res,next) => {
  //请求体数据
  //req.body

  //插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  },(err, data) => {
    if(err) {
        res.json({
            code: '1002',
            msg: '创建失败',
            data: null
        })
      return;
    }
    res.json({
        code: '0000',
        msg: '创建成功',
        data: data
    })
  })
 
})

//添加记录
router.get('/account/create', checkTokenMiddleware, (req,res) => {
  res.render('create')
})

router.get('/create', checkTokenMiddleware, (req,res) => {
  res.render('create')
})

//删除记录
router.delete('/account/:id', checkTokenMiddleware, (req,res) => {
  let id = req.params.id;

  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
        res.json({
            code: '1003',
            msg: '删除账单失败',
            data: null
        })
      return;
    }
    res.json({
        code: '0000',
        msg: '删除记录成功',
        data: {}
    })
  })
})

//获取当个账单信息
router.get('/account/:id', checkTokenMiddleware, (req,res) => {
    let {id} = req.params;

    AccountModel.findById(id, (err, data) => {
        if(err) {
            res.json({
                code: '1004',
                msg: '读取失败',
                data: null
            })
          return;
        }
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })  
    })
})

//更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    let {id} = req.params

    AccountModel.updateOne({_id: id}, req.body, (err, data) => {
        if(err) {
            res.json({
                code: '1005',
                msg: '更新失败',
                data: null
            })
          return;
        }
        AccountModel.findById(id, (err, data) => {
            if(err) {
                res.json({
                    code: '1004',
                    msg: '读取失败',
                    data: null
                })
              return;
            }
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data
            })  
        })
    })

})

module.exports = router;
