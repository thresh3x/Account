const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md = require('md5')
const jwt =require('jsonwebtoken')


//登录操作
router.post('/login', (req, res, next) => {
    let {name, password} = req.body;
    UserModel.findOne({name:name,password: md(password)}, (err, data) => {
        if(err) {
            res.json({
                code:'2001',
                msg: '数据库读取失败',
                data: null
            })
            return
        }

        //如果没有该数据
        if(!data) {
            return res.json({
                code:'2002',
                msg: '用户名或密码错误',
                data: null
            })
        }

        //创建token
        let token = jwt.sign({
            name: data.name,
            _id: data._id
        },'atguigu', {
            expiresIn: 60 * 60 * 24  //生命周期，单位s
        })

        //响应token
        res.json({
            code:'0000',
            msg: '登录成功',
            data: token
        })

        res.render('success', {msg: '登录成功~', url: '/account'})
    })
})

//退出登录
router.post('/logout', (req, res, next) => {
    //销毁session
    req.session.destroy(() => {
        res.render('success', {msg:'成功退出登录~', url: '/login'})
    })
})

module.exports = router;
