//app.js 
App({
  onLaunch: function () {
    // 第一次登录需经过登录页面, 后面直接验证token做免登陆
    const wx_token = (wx.getStorageSync('wx_token') && JSON.parse(wx.getStorageSync('wx_token'))) || {}
    const token = wx_token.token || ''
    const create_time = wx_token.create_time && new Date(wx_token.create_time).getTime()
    const now = new Date().getTime()
    const expire_time = 30*24*3600*1000
    const _this = this
    // 登录
    if (token && (now - create_time) < expire_time) {
      wx.request({
        url: `${this.globalData.baseUrl}/survey/v1/survey/user/login`, 
        method: 'POST',
        data: {
          token: token,
          type: 'token'
        },
        header: {
          'x-token': token
        },
        success(res) {
          const result = res.data
          if (result.code === 200) {
            wx.setStorageSync('wx_token', JSON.stringify(result.data))
            _this.globalData.token = result.data.token
            _this.globalData.isFirstLogin = result.data.isFirstLogin
            wx.switchTab({
              url: "/pages/task_pl/task_pl",
            })
          }
        }
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          _this.globalData.code = res.code
          // wx.request({
          //   url: `${this.globalData.baseUrl}/general/v1/survey/user/login`, 
          //   method: 'POST',
          //   data: {
          //     code: res.code,
          //     type: 'code'
          //   },
          //   header: {
          //     'x-token': token
          //   },
          //   success(res) {
          //     if (res.code === 200) {
          //       wx.setStorageSync('wx_token', JSON.stringify(res.data))
          //       this.globalData.token = res.data.token
          //       wx.switchTab({
          //         url: "/pages/login/login",
          //       })
          //     }
          //   }
          // })
        }
      })
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) 
  },
  globalData: {
    baseUrl: 'http://test.daoheit.com',
    // baseUrl: 'http://127.0.0.1:7009',
    token: '',
    // 授权UnionID时需传
    code: '',
    isFirstLogin: false,
    userName:'',
    phoneNum: '',
    userInfo: null
  }
})