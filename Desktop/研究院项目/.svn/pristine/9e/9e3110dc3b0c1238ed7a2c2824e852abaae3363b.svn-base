import request from '@/utils/request'
// 获取通知列表
export function getNotices(params) {
  return request({
    url: '/public_service/notices',
    method: 'get',
    params
  })
}
// 修改通知公告，:id为notice_id
export function updateNotices(id, data) {
  return request({
    url: '/public_service/notices/' + id,
    method: 'put',
    data
  })
}

// 根据id获取通知详细内容，:id为notice_id
export function getNoticesById(id, params) {
  return request({
    url: `/public_service/notices/${id}`,
    method: 'get',
    params
  })
}

// 发布通知公告
export function addNotices(data) {
  return request({
    url: '/public_service/notices',
    method: 'post',
    data
  })
}
