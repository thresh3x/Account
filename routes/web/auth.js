const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md = require('md5')

//注册界面
router.get('/reg', (req, res, next) => {
    res.render('auth/reg')
})

//注册用户
router.post('/reg', (req, res, next) => {
    UserModel.create({
        ...req.body,password: md(req.body.password)
    }, (err, data) => {
        if(err) {
            return res.status(500).send('注册失败')
        }
        res.render('success', {msg: '注册成功~', url: '/login'})
    })

})

//登录界面
router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

//登录操作
router.post('/login', (req, res, next) => {
    let {name, password} = req.body;
    UserModel.findOne({name:name,password: md(password)}, (err, data) => {
        if(err) {
            return res.status(500).send('登录失败')
        }

        //如果没有该数据
        if(!data) {
            return res.render('success', {msg: '账号或密码错误，请重新登录~', url: '/login'})
        }

        // 写入session
        req.session.name = data.name;
        req.session._id = data._id;

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
