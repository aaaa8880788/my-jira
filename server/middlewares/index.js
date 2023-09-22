// 导入 JSON Server 的 create 方法用于创建中间件
const { create } = require('json-server');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

// 创建中间件
const middleware = create();

middleware.use((req, res, next) => {
  if(req.method === 'POST' && req.path ==='/login') {
    // 登录接口
    // 获取数据库的数据
    const dbData = middleware.parent.db.getState()
    // 获取body数据
    const { username, password } = req.body
    const user = dbData.loginUsers.find(item => item.username === username)
    if(user) {
      if(user.password === password) {
        return res.status(200).json({
          code: 200,
          data: {
            username: user.username,
            token: user.token,
            message: '登录成功'
          }
        })
      }else {
        return res.status(200).json({
          code: 400,
          message: '登录密码输入错误,请重新输入'
        })
      }
    }else {
      return res.status(200).json({
        code: 400,
        message: '用户不存在'
      })
    }
  } else if(req.method === 'POST' && req.path ==='/register'){
    // 注册接口
    // 获取数据库的数据
    const dbData = middleware.parent.db.getState()
    // 获取body数据
    const { username, password } = req.body
    const user = dbData.loginUsers.find(item => item.username === username)
    if(user) {
      return res.status(200).json({
        code: 400,
        message: '用户已存在,请重新输入用户名'
      })
    } else {
      // 生成token
      const token = jwt.sign({ name: username }, password, { expiresIn: 60 * 60 })
      // 生成唯一的 ID
      const newId = uuidv4();
      dbData.loginUsers.push({
        id: newId,
        username,
        password,
        token
      })
      // 使用 db.setState 更新数据库
      middleware.parent.db.setState(dbData);
      res.status(200).json({
        code: 200,
        data: {
          username: username,
          token: token,
          message: '注册成功'
        }
      }); 
    }
  } else if(req.method === 'GET' && req.path ==='/getUserByToken') {
    // 获取数据库的数据
    const dbData = middleware.parent.db.getState()
    // 获取body数据
    const { token } = req.query
    if(!token) {
      return res.status(200).json({
        code: 400,
        message: '无效token'
      })
    }else {
      const user = dbData.loginUsers.find(item => item.token === token)
      console.log('user------', user);
      if(user) {
        return res.status(200).json({
          code: 200,
          data: {
            username: user.username,
            token: token,
          }
        })
      }else {
        return res.status(200).json({
          code: 400,
          message: '无效token'
        })
      }
    }
  } else {
    next()
  }
})

module.exports = middleware