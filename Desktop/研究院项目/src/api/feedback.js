import request from '@/utils/request'
// 获取问题反馈列表
export function getFeedBacksList(params) {
  return request({
    url: '/feedbacks',
    method: 'get',
    params
  })
}

// 提交问题反馈
export function addFeedBacks(data) {
  return request({
    url: '/feedbacks',
    method: 'post',
    data
  })
}

// 根据问题反馈id获取问题反馈的详细内容
export function getFeedBacksById(id) {
  return request({
    url: `/feedbacks/${id} `,
    method: 'GET'
  })
}
