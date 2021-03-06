// 小程序请求封装
const app = getApp()
const baseUrl = app.globalData.baseUrl

// 封装promise
function httpsPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res.data)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

const getRequest = httpsPromisify(wx.request)

const request = (url, data = {}, method = 'POST', param='') => { 
  return getRequest({
    url: baseUrl + url + (param ? `/${param}` : ''),
    data: data,
    method: method,
    header: {
      'X-Token': app.globalData.token
    }
  })
}

export default request 
