// pages/task/task.js
const { formatDate, formatTime } = require('../../utils/util.js')
const { getSurveyTasks, getUserInfo } = require('../../api.js')
var app = getApp();
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: '',
    isSearch: false,
    listQuery: {
      status: '1,2,4',
      limit: 5
    },
    cnt: 0,
    taskList: [],
    list: [], // 数据列表
    inputValue: '',
    tabTxt: ['用途', '查勘层次', '房地产类型'],//分类
    tab: [true, true, true],
    fdcytList: [{ 'id': '0', 'title': '住宅' }, { 'id': '1', 'title': '商业' }, { 'id': '2', 'title': '办公' }, { 'id': '3', 'title': '工业' }],
    fdcyt_id: -1,//用途
    fdcyt_txt: '',
    ckld_id: -1,//查勘层次
    ckld_txt: '',
    fdclx_id:0,
    fdclx_txt: '',
    fdcyt: '',
    ckld:'',
    fdclx:'',
    loadMore: false, 
    noMoreData: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.getUserInfo()
  },
  // 获取用户信息
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
        this.getSurveyTasks()
      }
    })
  },
  // 获取查勘任务
  getSurveyTasks(isRefresh) {
    this.setData({ isSearch: false })
    const data = {
      ...this.data.listQuery,
      surveyor: app.globalData.userName,
      page: isRefresh ? 1 : page
    }
    getSurveyTasks(data).then(res => {
      if (res.code === 200) {
        
        let taskList = res.data
        taskList.forEach(item => {
          item.finish_date = formatTime(new Date(item.finish_date))
        })
        this.setData({
          taskList: isRefresh ? taskList : this.data.taskList.concat(taskList),
          cnt: res.cnt,
          loadMore: false
        })
        if (isRefresh) {
          // 重置
          this.setData({
            noMoreData: false
          })
          page = 1
          wx.stopPullDownRefresh()
        }
        wx.hideLoading()
      }
    })
  },
  // 点击任务卡片
  clickTask(e) {
    const id = e.currentTarget.dataset.item.task_id
    const type = e.currentTarget.dataset.item.survey_type
    if (type === '住宅型房地产') {
      wx.navigateTo({
        url: `/pages/residencesurveyform/residencesurveyform?id=${id}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/commercialsurveyform/commercialsurveyform?id=${id}`
      })
    }
  },
  // 查询
  searchTask: function(){
    const searchVal = this.data.searchVal
    if (!searchVal) {
      return
    }
    const data = {
      property_name: searchVal,
      surveyor: app.globalData.userName,
      ...this.data.listQuery,
      page: page
    }
    this.setData({ isSearch: true })
    getSurveyTasks(data).then(res => {
      if (res.code === 200) {
        this.setData({
          taskList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (app.globalData.isFirstLogin) {
      wx.showModal({
        title: '提示',
        content: '首次登陆的用户需修改密码！',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#1AAD19',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/modifyPwd/modifyPwd',
            })
          } 
        }
      })
    }
  },

  bindKeyInput(e) {
    const val = e.detail.value
    if (!val) {
      this.getSurveyTasks()
    }
    this.setData({
      searchVal: val
    })
  },

  onPullDownRefresh: function() {
    //下拉
    this.getSurveyTasks(true)
  }, 

  onReachBottom: function() {
    //上拉
    if (this.data.listQuery.limit*page >= this.data.cnt) {
      this.setData({ noMoreData: true })
    } else {
      this.setData({ loadMore: true })
      page++
      this.getSurveyTasks()
    }
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
  }, 

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function (e) {
    let inputValue = this.data.inputValue;
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          fdcyt_id: id,
          fdcyt_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          ckld_id: id,
          ckld_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          fdclx_id: id,
          fdclx_txt: txt
        });
        break;
    }

    let fdcyt = self.data.fdcyt_id;
    let ckld = self.data.ckld_id;
    let fdclx = self.data.fdclx_id;
    //数据筛选
    if (fdcyt == -1) {
      fdcyt = '';
    }
    if (ckld == -1) {
      ckld = '';
    }
    if (fdclx == -1) {
      fdclx = '';
    }

    self.setData({
      fdcyt: fdcyt,
      ckld: ckld,
      fdclx: fdclx,
      list: []
    });
    
    GetList(self, 1);
  },
})

const url = app.globalData.base_url + '/survey/batch/tasks';
var GetList = function (that, p) {
  var  dcryid = app.globalData.ryxxid;
  var rwmc = that.data.inputValue;
  var fdcyt = that.data.fdcyt;
  var ckld = that.data.ckld;
  var fdclx = that.data.fdclx;
  var token = wx.getStorageSync('token');
  batch_taskList({
    pageIndex: p,
    pageSize: 5,
    dcryid: dcryid,
    rwmc: rwmc,
    fdcyt: fdcyt,
    ckld: ckld,
    fdclx: fdclx
  }).then(res => {
    if (res.code == 200) {
      if (res.data.length === 0) {
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏
        });
      } else {
        var l = that.data.list;
        for (var i = 0; i < res.data.length; i++) {
          l.push(res.data[i]);
        }
        l = l.map(item => {
          item.num = (item.ytjxmsl_fcdc === 0 ? 0 : item.ytjxmsl_fcdc / item.xmsl).toFixed(2)
          return item
        });
        that.setData({
          list: l
        });
      }
    } else {
      if (res.code == 4001) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
        })
      }
      if (res.code == 4002) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
        })
      }

    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }).catch(e => {

  }) 
}