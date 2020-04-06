// pages/search_index/search_index.js
const app = getApp();
var template = require('../../components/template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this);
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
  
  },

  pldc: function () {
    wx.navigateTo({
      url: "/pages/task_pl/task_pl",
      success: function (res) {
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },

  gadc: function () {
    wx.navigateTo({
      url: "/pages/task_gean/task_gean",
       success: function (res) {
       },
       fail: function (res) {

       },
       complete: function (res) {

       },
    })
  },

  zydc: function () {
    wx.navigateTo({
      url: "/pages/district_specialresearch/district_specialresearch",
      success: function (res) {
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },

})