// pages/login/login.js
var app = getApp();
const { hexMD5 } = require('../../utils/md5.js')
const { login, setAuth } = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirstLogin: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isFirstLogin: app.globalData.isFirstLogin
    })
  },
  // 登录(form)
  login(e) {
    const form = e.detail.value
    const reg = /^1\d{10}$/
    if (!form.mobile) {
      wx.showToast({
        title: '账号不能为空！',
        icon: 'none'
      })
      return
    } else if (form.mobile.length !== 11 || !reg.test(form.mobile)) {
      wx.showToast({
        title: '手机号不正确！',
        icon: 'none'
      })
      return
    } else if (!form.pw) {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none'
      })
      return
    }
    app.globalData.phoneNum = form.mobile
    form.pw = hexMD5(form.pw)
    const data = {
      ...form,
      type: 'form'
    }
    login(data).then(res => {
      if (res.code === 200) {
        wx.setStorageSync('wx_token', JSON.stringify(res.data))
        app.globalData.token = res.data.token
        app.globalData.isFirstLogin = res.data.isFirstLogin
        wx.showToast({
          title: res.msg,
          image: '../../images/success.png'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/task_pl/task_pl'
          })
        }, 500)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误！',
        icon: 'none'
      })
    })
  },
  bindGetUserInfo(e) {
    debugger
    if (e.detail.userInfo) {
      const data = {
        code: app.globalData.code,
        token: app.globalData.token,
        // 加密数据（后台用于获取unionid）
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        signature: e.detail.signature,
        rawData: e.detail.rawData,
        userInfo: e.detail.userInfo
      }
      setAuth(data).then(res => {
        if (res.code === 200) {
          // wx.setStorageSync('wx_token', JSON.stringify(res.data))
          wx.showToast({
            title: '授权成功！'
          })
        } else {
          wx.showToast({
            title: '授权失败！',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        title: '用户未授权',
        content: '如需正常使用信息查勘，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: function success(res) {
                console.log('调用openSetting方法success:', res)
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})