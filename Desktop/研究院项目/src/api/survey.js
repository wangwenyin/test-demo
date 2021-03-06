import request from '@/utils/request1'
// 获取查勘任务列表
export function getSurveyTaskList(params) {
  return request({
    url: '/survey/tasks',
    method: 'get',
    params
  })
}

// 更新查勘任务
export function editSurveyTask(id, data) {
  return request({
    url: `/survey/tasks/${id} `,
    method: 'put',
    data
  })
}

// 添加查勘任务
export function addSurveyTask(data) {
  return request({
    url: '/survey/tasks',
    method: 'post',
    data
  })
}

// 删除查勘任务
export function deleteSurveyTask(id, data) {
  return request({
    url: `/survey/tasks/${id}`,
    method: 'delete',
    data
  })
}
// 根据任务Id获取任务基本信息
export function getSurveyTaskById(id) {
  return request({
    url: `/survey/tasks/${id}`,
    method: 'get'
  })
}

// 审核查勘任务
export function auditSurveyTask(id, data) {
  return request({
    url: `/survey/tasks/audit/${id}`,
    method: 'put',
    data
  })
}
// 发送消息
export function sendMessage(data) {
  return request({
    url: `/survey/messages`,
    method: 'post',
    data
  })
}
// 发送消息
export function getMessageById(id, params) {
  return request({
    url: `/survey/messages/${id}`,
    method: 'get',
    params
  })
}
// 上传资料图片
export function getSurveyAttachment(id, params) {
  return request({
    url: `/survey/material/${id}`,
    method: 'get',
    params
  })
}
// 删除资料图片
export function deleteSurveyAttachment(id, data) {
  return request({
    url: `/survey/material/${id}`,
    method: 'delete',
    data
  })
}

// 上传资料图片
export function uploadSurveyAttachment(data) {
  return request({
    url: `/survey/material`,
    method: 'post',
    data
  })
}
// 查询查勘信息（经营性）
export function getBusinessInfo(id) {
  return request({
    url: `/survey/business/${id}`,
    method: 'get'
  })
}
// 查询查勘信息（住宅）
export function getResidenceInfo(id) {
  return request({
    url: `/survey/residence/${id}`,
    method: 'get'
  })
}
// 根据任务编号查询查勘人员定位路径
export function getLocationInfo(id) {
  return request({
    url: `/survey/location/${id}`,
    method: 'get'
  })
}
// 根据任务编号查询资料附件
export function getMaterial(id, params) {
  return request({
    url: `/survey/material/${id}`,
    method: 'get',
    params
  })
}
