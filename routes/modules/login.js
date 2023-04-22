const express = require('express')
const router = express.Router()
const Login = require('../../models/login')

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  Login.find()
    .lean()
    .then((users) => {
      let errorSign = ''
      const user = users.find(user => user.email === email)
      
      // 驗證使用者輸入之email是否在資料庫內
      if (!user) {
        errorSign = 'User not found'
        res.render('index', { errorSign })
      } else {
        // 驗證使用者輸入密碼是否正確
        if (user.password !== password) {
          errorSign = 'Password not found'
          res.render('index', { errorSign })
        } else {
          res.render('welcome', { firstName: user.firstName })
        }
      }
    })
    .catch(error => { console.log(error) })
})

module.exports = router