module.exports = (req, res, next) => {
    //判断session是否存在
    if(!req.session.name) {
        return res.redirect('login');
    }
    next()
}