var template = require('../../components/template/template.js');
const app = getApp();
const { getUserInfo } = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    phoneNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ phoneNum: app.globalData.phoneNum })
  },
  getUserInfo() {
    const data = {
      type: 'token',
      token: app.globalData.token
    }
    getUserInfo(data).then(res => {
      if (res.code === 200) {
        const userInfo = res.data
        app.globalData.userName = userInfo.real_name
        app.globalData.phoneNum = userInfo.mobile
      }
    })
  },
  logout: function () {
    wx.removeStorageSync('wx_token')
    app.globalData.token = ''
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  toModifyPwd() {
    wx.navigateTo({
      url: '/pages/modifyPwd/modifyPwd'
    })
  }
})