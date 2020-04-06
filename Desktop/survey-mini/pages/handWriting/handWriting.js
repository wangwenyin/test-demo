// pages/handWriting/handWriting.js
const app = getApp();
import Handwriting from '../../components/handwriting/handwriting.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_id: '',
    index: '',
    selectedId: '',
    type: '',
    lineColor: 'darkred',
    slideValue: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      task_id: options.id,
      index: options.index,
      selectedId: options.selectedId,
      type: options.type
    })
    this.handwriting = new Handwriting(this, {
      lineColor: this.data.lineColor,
      slideValue: this.data.slideValue,
    })
  },
  retDraw() {
    this.handwriting.retDraw()
  },
  saveImg() {
    //生成图片
    if (!this.handwriting.linePrack.length) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false
    }
    const _this = this
    let matrl_type
    switch(this.data.index) {
      case '3': matrl_type = '说明人签名图片'; break
      case '4': matrl_type = '确认人签名图片'; break
      case '5': matrl_type = '领勘人签名图片'; break
      default: matrl_type = '查勘人签名图片'
    }
    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      success(res) {
        console.log(res.tempFilePath);
        const data = {
          task_id: _this.data.task_id,
          matrl_type: matrl_type
        }
        // 存入服务器
        wx.uploadFile({
          url: app.globalData.baseUrl + '/survey/v1/survey/material', 
          filePath: res.tempFilePath,
          name: 'file',
          formData: data,
          success(res) {
            const data = JSON.parse(res.data)
            if (data.code === 200) {
              wx.showToast({
                title: '保存成功！',
                icon: 'none'
              })
              setTimeout(() => {
                const type = _this.data.type
                const selectedId = _this.data.selectedId
                if (type === 'c') {
                  wx.redirectTo({
                    url: `/pages/commercialsurveyform/commercialsurveyform?id=${_this.data.task_id}&selectedId=${selectedId}`,
                  })
                } else {
                  wx.redirectTo({
                    url: `/pages/residencesurveyform/residencesurveyform?id=${_this.data.task_id}&selectedId=${selectedId}`,
                  })
                }
              }, 1000)
            } else {
              wx.showToast({
                title: '保存失败！',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})