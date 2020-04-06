import request from '@/utils/request'

// 查询符合条件的价格复核任务
export function getReviewTasks(params) {
  return request({
    url: '/dispute/tasks',
    method: 'get',
    params
  })
}
// （信息审核）获取某个任务某个节点的信息
export function getReviewDetail({ id, node }) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'get',
    params: { node }
  })
}
// （现场查勘）获取某个任务某个节点的信息
export function getFieldSurveyDetail({ id, node }) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'get',
    params: { node }
  })
}
// （复核估价）获取某个任务某个节点的信息
export function getAppraisalDetail({ id, node }) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'get',
    params: { node }
  })
}
// （结果终审）获取某个任务某个节点的信息
export function getFinalReivewDetail({ id, node }) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'get',
    params: { node }
  })
}
// 更新信息审核流程信息
export function updateReivew(id, data) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'put',
    data
  })
}
// 更新现场查勘流程信息
export function updateFieldSurvey(id, data) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'put',
    data
  })
}
// 更新复核估价流程信息
export function updateAppraisal(id, data) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'put',
    data
  })
}
// 更新结果终审流程信息
export function updateFinalReivew(id, data) {
  return request({
    url: `/dispute/tasks/${id}`,
    method: 'put',
    data
  })
}
// 根据角色获取用户
export function getUsers(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}
// 删除查勘图片
export function deleteSurveyImg(id, data) {
  return request({
    url: `/dispute/materials/${id}`,
    method: 'delete',
    data
  })
}
// 获取查勘图片
export function getSurveyImgs(id) {
  return request({
    url: `/dispute/materials/${id}`,
    method: 'get'
  })
}
// 获取复核统计chart数据
export function getChartData(params) {
  return request({
    url: `/dispute/tasks/new`,
    method: 'get',
    params
  })
}

