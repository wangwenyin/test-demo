const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = 'https://www.itit123.cn';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

//项目文件上传
function chooseWxImageOrVideo_project(type,dcdxid, rwid, zlfl, zllx, cb) {
  var url = app.globalData.base_url + '/survey/batch/projectFiles';
  if (zlfl === 0) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            dcdxid: dcdxid,
            rwid: rwid,
            zlfl: zlfl,
            zllx: zllx
          },
          success: function (res) {
            return typeof cb == "function" && cb(res.data)
          },
          fail: function () {
            return typeof cb == "function" && cb(false)
          }
        })
      }
    })

    if (zlfl === 1) {
      wx.chooseVideo({
        sourceType: [type],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: function (res) {
          // let tempFilePaths = res.tempFilePath;
          console.log(res.tempFilePath);
          wx.uploadFile({
            url: url,
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
              dcdxid: id,
              zllx: videotype
            },
            success: function (res) {
              return typeof cb == "function" && cb(res.data)
            },
            fail: function () {
              return typeof cb == "function" && cb(false)
            }
          })
        }
      })
    }
  }

}

module.exports = {
  formatTime,
  formatDate,
  req: req,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getReq: getReq
}


