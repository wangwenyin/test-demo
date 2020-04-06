// pages/commercialsurveyform/commercialsurveyform.js
const app = getApp()
const { formatDate, formatTime } = require('../../utils/util.js')
const { getCommercialSurveyData, saveCommercialSurveyData, getSurveyImgs, delSurveyImgs, sendMessage, saveSurveyPaths } = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_id: '',
    form: {},
    active: 0,
    activeName1: '1',
    activeName2: '1',
    date: formatDate(new Date()),
    isGetDate: true,
    show: false,
    showDel: false,
    nocancel:false,
    sign_in: false,
    info: '',
    show_wqqt: false,
    show_nqqt: false,
    show_fjdmqt: false,
    show_ltdmqt: false,
    show_wmqt: false,
    show_nmqt: false,
    show_cqt: false,
    show_sfgbyjg_qt: false,
    show_syxz_zj: false,
    lkr_signatureImgs: [],
    ckr_signatureImgs: [],
    smr_signatureImgs: [],
    qrr_signatureImgs: [],
    usingStatus: [
      { value: '自用', checked: 'true' },
      { value: '空置' },
      { value: '出租' }
    ],
    streets: [
      { value: '是', checked: 'true' },
      { value: '否' }
    ],
    howFars: [
      { value: '中心', checked: 'true' },
      { value: '较近' },
      { value: '一般' },
      { value: '较远' },
      { value: '远' }
    ],
    scales: [
      { value: '大', checked: 'true' },
      { value: '较大' },
      { value: '一般' },
      { value: '较小' },
      { value: '小' }
    ],
    passengers: [
      { value: '多', checked: 'true' },
      { value: '较多' },
      { value: '一般' },
      { value: '较少' },
      { value: '少' }
    ],
    distances: [
      { value: '近', checked: 'true' },
      { value: '较近' },
      { value: '一般' },
      { value: '较远' },
      { value: '远' }
    ],
    fdStystems: [
      { value: '防盗门对进', checked: 'true' },
      { value: '闭路监控' },
      { value: '无' }
    ],
    sdStystems: [
      { value: '明敷', checked: 'true' },
      { value: '暗敷' }
    ],
    zmStystems: [
      { value: '吊灯', checked: 'true' },
      { value: '吸顶灯' },
      { value: '格栅灯' },
      { value: '日光灯' },
      { value: '其它' }
    ],
    ktStystems: [
      { value: '市政集中供应', checked: 'true' },
      { value: '中央空调' },
      { value: '独立空调' },
      { value: '无' }
    ],
    txStystems: [
      { value: '电话', checked: 'true' },
      { value: '有线电视' },
      { value: '网络' },
      { value: '无' }
    ],
    xfStystems: [
      { value: '消防栓', checked: 'true' },
      { value: '灭火器' },
      { value: '自动喷淋' },
      { value: '烟感报警' }
    ],
    outerWalls: [
      { value: '清水', checked: 'true' },
      { value: '面砖' },
      { value: '外墙漆' },
      { value: '水刷石' },
      { value: '马赛克' },
      { value: '其它' }
    ],
    innerWalls: [
      { value: '清水', checked: 'true' },
      { value: '刷白' },
      { value: '壁纸' },
      { value: '乳胶漆' },
      { value: '墙面装饰' },
      { value: '其它' }
    ],
    ceilings: [
      { value: '清水', checked: 'true' },
      { value: '刷白' },
      { value: '壁纸' },
      { value: '乳胶漆' },
      { value: '墙面装饰' },
      { value: '其它' }
    ],
    rooms: [
      { value: '复合地板', checked: 'true' },
      { value: '地砖' },
      { value: '石材' },
      { value: '水泥' },
      { value: '实木' },
      { value: '其它' }
    ],
    stairs: [
      { value: '大理石', checked: 'true' },
      { value: '地砖' },
      { value: '水磨石' },
      { value: '水泥' },
      { value: '实木' },
      { value: '其它' }
    ],
    out_doors: [
      { value: '木', checked: 'true' },
      { value: '防盗门' },
      { value: '钢' },
      { value: '铝' },
      { value: '夹板门' },
      { value: '其它' }
    ],
    in_doors: [
      { value: '木', checked: 'true' },
      { value: '钢' },
      { value: '铝' },
      { value: '夹板门' },
      { value: '其它' }
    ],
    windows: [
      { value: '木', checked: 'true' },
      { value: '塑钢' },
      { value: '铝合金' },
      { value: '钢' },
      { value: '彩铝' },
      { value: '其它' }
    ],
    structures: [
      { value: '打通双拼', checked: 'true' },
      { value: '隔断为房中房' },
      { value: '其它' }
    ],
    decorations: [
      { value: '精装', checked: 'true' },
      { value: '豪装' },
      { value: '简装' },
      { value: '毛坯' }
    ],
    device_status: [
      { value: '正常', checked: 'true' },
      { value: '破损' },
      { value: '无法使用' }
    ],
    decorate_status: [
      { value: '完好', checked: 'true' },
      { value: '轻度破损' },
      { value: '一般破损' },
      { value: '严重破损' }
    ],
    isornot: [
      { value: '有', checked: 'true' },
      { value: '无' }
    ],
    zdft_value: '有',
    kt_value: '有',
    ht_value: '有'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    for (let i=0;i<10;i++) {
      this.setData({
        ['filePathList' + (i+1)]: []
      })
    }
    const matrl_types = ['物业位置图', '估价对象照片', '权属证明资料', '领勘人签名图片', '查勘人签名图片', '说明人签名图片', '确认人签名图片']
    
    this.setData({ task_id: options.id })
    this.formHandWriting(options)
    this.uploadDataWhenOnline()
    this.getCommercialSurveyData(options.id)
    matrl_types.forEach(item => {
      this.getSurveyImgs(options.id, item)
    })
    
    
  },
  // 在线自动上传查勘数据
  uploadDataWhenOnline() {
    if (wx.getStorageSync('save_c')) {
      const form = JSON.parse(wx.getStorageSync('save_c'))
      saveCommercialSurveyData(form, this.data.task_id).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '重新保存成功！',
            icon: 'none'
          })
          wx.removeStorageSync('save_c')
        } else {
          wx.showToast({
            title: '重新保存失败！',
            icon: 'none'
          })
        }
      })
    } else if (wx.getStorageSync('submit_c')) {
      const form = JSON.parse(wx.getStorageSync('submit_c'))
      saveCommercialSurveyData(form, this.data.task_id).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '重新提交成功！',
            icon: 'none'
          })
          wx.removeStorageSync('submit_c')
        } else {
          wx.showToast({
            title: '重新提交失败！',
            icon: 'none'
          })
        }
      })
    }
  },
  // 获取表单数据
  getCommercialSurveyData(id) {
    getCommercialSurveyData({}, id).then(res => {
      if (res.code === 200) {
        this.setData({
          form: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  // 获取查勘图片
  getSurveyImgs(id, matrl_type) {
    const data = {
      matrl_type: matrl_type
    }
    getSurveyImgs(data, id).then(res => {
      if (res.code === 200) {
        const imageList = res.data
        if (matrl_type === '物业位置图') {
          this.setData({ filePathList1: imageList })
        } else if (matrl_type === '权属证明资料') {
          this.setData({ filePathList2: imageList })
        } else if (matrl_type === '领勘人签名图片') {
          this.setData({ lkr_signatureImgs: imageList })
        } else if (matrl_type === '查勘人签名图片') {
          this.setData({ ckr_signatureImgs: imageList })
        } else if (matrl_type === '说明人签名图片') {
          this.setData({ smr_signatureImgs: imageList })
        } else if (matrl_type === '确认人签名图片') {
          this.setData({ qrr_signatureImgs: imageList })
        } else {
          const shot_parts = ['外部', '外立面', '景观', '入户大堂', '入户门', '电梯','厨房', '客厅']
          imageList.forEach(item => {
            for (let i=0; i<shot_parts.length; i++) {
              if (item.shot_part === shot_parts[i]) {
                let filePathList = this.data['filePathList' + (i+3)]
                filePathList.push(item)
                this.setData({ ['filePathList' + (i+3)]: filePathList })
                // 这样写有问题
                // this.setData({ ['filePathList' + (i+3)]: this.data['filePathList' + (i+3)].push(item.url) })
              }
            }
          })
        }
      }
    })
  },
  // 查勘表单提交
  formSubmit(e) {
    const form = e.detail.value
    const id = this.data.task_id
    // 标记按钮类型 表单类型 tab
    const { index, type, selectedid } = e.detail.target.dataset

    if (index !== '2') {
      // 保存数据 status: 查勘中
      form.status = 2
      saveCommercialSurveyData(form, id).then(res => {
        if (res.code === 200) {
          if (index === '1') {
            wx.showToast({
              title: '保存成功！',
              icon: 'none'
            })
          }
        } else {
          if (index === '1') {
            wx.showToast({
              title: '保存失败！',
              icon: 'none'
            })
          }
        }
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: '当前网络信息不好, 查勘数据已被缓存。待网络信号良好时, 再次打开当前页面, 即可重新保存！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              // 离线缓存
              wx.getStorageSync('submit_c') && wx.removeStorageSync('submit_c')
              wx.setStorageSync('save_c', JSON.stringify(form))
            }
          }
        })
      })
      // 点击签名（先保存数据，防止签名后跳回数据丢失）
      if (index !== '1') {
        wx.redirectTo({
          url: `/pages/handWriting/handWriting?id=${id}&index=${index}&selectedId=${selectedid}&type=${type}`,
        })
      }
    } else {
      // 完成提交 status: 待审核
      if (form.fdcmc && form.qzbh && form.fdcwz && form.syzk && form.zjsp && form.xzyt && form.dzlxfs && form.ckrq) {
        form.status = 3
        saveCommercialSurveyData(form, id).then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: '提交成功！',
              icon: 'none'
            })
            setTimeout(() => {
              wx.switchTab({
                url: `/pages/task_pl/task_pl`,
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '提交失败！',
              icon: 'none'
            })
          }
        }).catch(err => {
          wx.showModal({
            title: '提示',
            content: '当前网络信息不好, 查勘数据已被缓存。待网络信号良好时, 再次打开当前页面, 即可重新提交！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.getStorageSync('save_c') && wx.removeStorageSync('save_c')
                wx.setStorageSync('submit_c', JSON.stringify(form))
              }
            }
          })
        })
      } else {
        wx.showToast({
          title: '请填写必填项！',
          icon: 'none'
        })
      }
    } 
  },
  // 上传查勘照片
  uploadFile: function (e) {
    const _this = this
    let index = +e.target.dataset.index
    
    const matrl_type = index > 2 ? '估价对象照片' : (index === 2 ? '权属证明资料' : 
    '物业位置图')
    let formData = {
      task_id: _this.data.task_id,
      matrl_type: matrl_type
    }
    let shot_part = ''
    switch(index) {
      case 3: shot_part = '外部'; break
      case 4: shot_part = '外立面'; break
      case 5: shot_part = '景观'; break
      case 6: shot_part = '入户大堂'; break
      case 7: shot_part = '入户门'; break
      case 8: shot_part = '电梯'; break
      case 9: shot_part = '厨房'; break
      case 10: shot_part = '客厅'; break
    }
    if (shot_part) {
      formData.shot_part = shot_part
    }
    wx.chooseImage({
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        // const num = 10
        // tempFilePaths = tempFilePaths.map(path => {
        //   let item = {}
        //   item.url = path
        //   return item
        // })
        // for (let i=1; i<=num; i++) {
        //   index === i ? _this.setData({ ['filePathList' + i]: _this.data['filePathList' + i].concat(tempFilePaths) }) : ''
        // }
        for (let i=0; i<tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.baseUrl + '/survey/v1/survey/material',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: formData,
            header: {
              token: app.globalData.token
            },
            success: function (res) {
              const data = JSON.parse(res.data)
              if (data.code === 200) {
                wx.showToast({
                  title: '上传成功！',
                  image: '../../images/success.png'
                })
                const url = data.url
                let filePathList = _this.data['filePathList' + index]
                const item = {
                  matrl_name: url.substring(url.lastIndexOf('/') + 1),
                  url: url
                }
                filePathList.push(item)
                _this.setData({ ['filePathList' + index]: filePathList })
              } else {
                wx.showToast({
                  title: '上传失败！',
                  image: '../../images/fail.png'
                })
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '当前网络信息不好, 建议用相机拍照，等到网络较好时再选择图片上传！',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  hideDel() {
    this.setData({ showDel: false })
  },
  // 长按图片删除
  onLongPress() {
    this.setData({ showDel: true })
  },
  deleteImg(e) {
    const id = this.data.task_id
    // 图片类型标记
    const num = +e.target.dataset.num
    // 图片下标
    const index = +e.target.dataset.index
    // 图片类型总数
    const total = 10
    const data = {
      matrl_name: e.target.dataset.name
    }
    // 前台删除
    for (let i=1; i<=total; i++) {
      if (num === i) {
        this.data['filePathList' + i].splice(index, 1)
        this.setData({ 
          ['filePathList' + i]: this.data['filePathList' + i] 
        })
        break
      }
    }
    delSurveyImgs(data, id).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '删除失败！',
          icon: 'none'
        })
      }
    })
  },
  // 图片放大预览
  preview(e) {
    const list = e.currentTarget.dataset.list
    const index = +e.currentTarget.dataset.index
    const urls = list.map(item => {
      return item.url
    })
    wx.previewImage({
       current: urls[index], 
       urls: urls 
    })
  },
  closePreview() {
    this.setData({ showPreview: false })
  },
  // 实时保存查勘路径
  saveSurveyPaths() {
    this.setData({ sign_in: true })
    wx.showToast({
      title: '签到成功！',
      icon: 'none'
    })
    this.getLocation()
    this.timer = setInterval(() => {
      this.getLocation()
    }, 60*1000)
  },
  getLocation() {
    const _this = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const data = {
          task_id: _this.data.task_id,
          x: res.longitude,
          y: res.latitude,
          path_time: formatTime(new Date())
        }
        saveSurveyPaths(data).then(res => {
          if (res.code === 200) {
            console.log('路径保存成功！')
          }
        })
      }
    })
  },
  // 控制其它输入框
  radioChange(e) {
    const name = e.currentTarget.dataset.name
    const value = e.detail.value
    if (name === 'wq') {
      value === '其它' ? this.setData({ show_wqqt: true }) : this.setData({ show_wqqt: false })
    } else if (name === 'nq') {
      value === '其它' ? this.setData({ show_nqqt: true }) : this.setData({ show_nqqt: false })
    } else if (name === 'fjdm') {
      value === '其它' ? this.setData({ show_fjdmqt: true }) : this.setData({ show_fjdmqt: false })
    } else if (name === 'ltdm') {
      value === '其它' ? this.setData({ show_ltdmqt: true }) : this.setData({ show_ltdmqt: false })
    } else if (name === 'wm') {
      value === '其它' ? this.setData({ show_wmqt: true }) : this.setData({ show_wmqt: false })
    } else if (name === 'nm') {
      value === '其它' ? this.setData({ show_nmqt: true }) : this.setData({ show_nmqt: false })
    } else if (name === 'c') {
      value === '其它' ? this.setData({ show_cqt: true }) : this.setData({ show_cqt: false })
    } else if (name === 'sfgbyjg') {
      value === '其它' ? this.setData({ show_sfgbyjg_qt: true }) : this.setData({ show_sfgbyjg_qt: false })
    } else if (name === 'syxz') {
      value === '出租' ? this.setData({ show_syxz_zj: true }) : this.setData({ show_syxz_zj: false })
    } 
  },
  // tab切换
  onTabChange(e) {
    this.setData({
      active: e.detail.index
    })
  },
  // 上传查勘照片(递归)
  uploadFile2 (filePaths, successUp, failUp, i, length) {
    wx.uploadFile({
      url: app.globalData.baseUrl + '/general/v1/survey/material',
      filePath: filePaths[i],
      name: 'file',
      formData: {
        task_id: _this.data.task_id,
        matrl_type: '位置示意图'
      },
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        debugger
        successUp ++
        if (data.code === 200) {
          wx.showToast({
            title: '上传成功！',
            image: '../../images/success.png'
          })
        } else {
          wx.showToast({
            title: '上传失败！',
            image: '../../images/fail.png'
          })
        }
      },
      fail: (res) => {
        failUp ++
      },
      complete: () => {
        i ++                       
        if(i == length) {                      
          wx.showToast({
            title: '总共'+successUp+'张上传成功,'+failUp+'张上传失败！',
            icon: 'none'
          })
        }
        else {  //递归调用uploadFile2函数
          this.uploadFile2(filePaths, successUp, failUp, i, length);
        }
      }
    })
  },
  uploadImage(e) {
    const _this = this
    let index = e.target.dataset.index
    wx.chooseImage({
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        index === '1' ? _this.setData({ filePathList1: tempFilePaths }) : ''
        index === '2' ? _this.setData({ filePathList2: tempFilePaths }) : ''
        index === '3' ? _this.setData({ filePathList3: tempFilePaths }) : ''
        index === '4' ? _this.setData({ filePathList4: tempFilePaths }) : ''
        index === '5' ? _this.setData({ filePathList5: tempFilePaths }) : ''
        index === '6' ? _this.setData({ filePathList6: tempFilePaths }) : ''
        index === '7' ? _this.setData({ filePathList7: tempFilePaths }) : ''
        index === '8' ? _this.setData({ filePathList8: tempFilePaths }) : ''
        index === '9' ? _this.setData({ filePathList9: tempFilePaths }) : ''
        index === '10' ? _this.setData({ filePathList10: tempFilePaths }) : ''

        let successUp = 0 //成功个数
        let failUp = 0 //失败个数
        let i = 0 //第几个
        const length = tempFilePaths.length //总共个数
        _this.uploadFile2(tempFilePaths, successUp, failUp, i, length)
      }
    })
  },
  zdft_radioChange(e) {
    this.setData({
      zdft_value: e.detail.value
    })
  },
  kt_radioChange(e) {
    this.setData({
      kt_value: e.detail.value
    })
  },
  ht_radioChange(e) {
    this.setData({
      ht_value: e.detail.value
    })
  },
  bindDateChange(e) {
    // 表单日期重新编辑
    this.setData({
      date: e.detail.value,
      isGetDate: false
    })
  },
  // 输入消息
  onInputChange(e) {
    this.setData({
      info: e.detail.value
    })
  },
  // 折叠面板change
  onCollapseChange1(event) {
    this.setData({
      activeName1: event.detail
    })
  },
  onCollapseChange2(event) {
    this.setData({
      activeName2: event.detail
    })
  },
  cancel() {
    this.setData({
      show: false
    })
  },
  confirm() {
    if (!this.data.info) {
      wx.showToast({
        title: '消息不能为空！',
        icon: 'none'
      })
      return
    }
    const data = {
      content: this.data.info,
      task_id: this.data.task_id,
      type: '查勘消息',
      creator: app.globalData.phoneNum
    }
    sendMessage(data).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '发送成功！',
          icon: 'none'
        })
        this.setData({
          info: '',
          show: false
        })
      } else {
        wx.showToast({
          title: '发送失败！',
          icon: 'none'
        })
      }
    })
  },
  showModal() {
    this.setData({
      show: true
    })
  },
  formHandWriting(op) {
    if (op.selectedId) {
      this.setData({
        active: +op.selectedId
      })
    }
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
    clearInterval(this.timer)
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