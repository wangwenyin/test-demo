// pages/register/register.js

var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    showTopTips: false,
    errorMsg: "",
    logo:'../images/rg1.png'
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },
   

  formSubmit: function (e) {
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subPassword;
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册
    if ("" == util.trim(account)) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 2000
      })
     /*  util.isError("账号不能为空", that); */
      return;
    } else {
      util.clearError(that);
      wx.request({
        url: '/register/checkLoginName',//上线的话必须是https，没有appId的本地请求貌似不受影响
        data: { "loginName": account},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          if (!res) {
            wx.showToast({
              title: '账号已经被注册过',
              icon: 'none',
              duration: 2000
            })
           /*  util.isError("账号已经被注册过", that); */
            return;
          }
         /*  console.log(res.data.result)
          that.setData({
            Industry: res.data.result
          }) */
        },
        fail: function () {
        },
        complete: function () {
          // complete
        }
      })
    
    
      /* app.ajax.req('/register/checkLoginName', {
        "loginName": account
      }, function (res) {
        if (!res) {
          util.isError("账号已经被注册过", that);
          return;
        }
      }); */
    }
    // 判断密码是否为空
    if ("" == util.trim(password)) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      /* util.isError("密码不能为空", that); */
      return;
    } else {
      util.clearError(that);
    }
    // 两个密码必须一致
    if (subPassword != password) {
      wx.showToast({
        title: '输入密码不一致',
        icon: 'none',
        duration: 2000
      })
     /*  util.isError("输入密码不一致", that); */
      return;
    } else {
      util.clearError(that);
    }
    // 验证都通过了执行注册方法

    wx.request({
      url: '/itdragon/register',//上线的话必须是https，没有appId的本地请求貌似不受影响
      data: {
        "account": account,
        "password": password },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (true == res) {
          // 显示模态弹窗
          wx.showModal({
            title: '注册状态',
            content: '注册成功，请点击确定登录吧',
            success: function (res) {
              if (res.confirm) {
                // 点击确定后跳转登录页面并关闭当前页面
                wx.redirectTo({
                  url: '../login/login?account=' + account + '&password?=' + password + ''
                })
              }
            }
          })
        } else {
          // 显示消息提示框
          wx.showToast({
            title: '注册失败',
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail: function () {
        
      },
      complete: function () {
        // complete
      }
    })
   
    
    /* a
    pp.ajax.req('/itdragon/register', {
      "account": account,
      "password": password
    }, function (res) {
      if (true == res) {
        // 显示模态弹窗
        wx.showModal({
          title: '注册状态',
          content: '注册成功，请点击确定登录吧',
          success: function (res) {
            if (res.confirm) {
              // 点击确定后跳转登录页面并关闭当前页面
              wx.redirectTo({
                url: '../login/login?account=' + account + '&password?=' + password + ''
              })
            }
          }
        })
      } else {
        // 显示消息提示框
        wx.showToast({
          title: '注册失败',
          icon: 'error',
          duration: 2000
        })
      }
    }); */
  },
  back(){
    wx.redirectTo({
      url: "/pages/login/login",
    })

  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  },
  
})