import request from '/utils/request.js'

module.exports = {
  // 登录
  login: (data) => request('/survey/v1/survey/user/login', data),
  // 用户授权
  setAuth: (data) => request('/survey/v1/survey/user/authorization', data),
  // 获取用户pc端信息
  getUserInfo: (data) => request('/survey/v1/survey/user/getUserInfo', data, 'GET'),
  // 用户修改密码
  modifyPwd: (data) => request('/survey/v1/survey/user/pw', data, 'PUT'),
  // 获取查勘任务列表
  getSurveyTasks: data => request('/survey/v1/survey/tasks', data, 'GET'),
  // 获取查勘信息（经营性）
  getCommercialSurveyData: (data, id) => request('/survey/v1/survey/business', data, 'GET', id),
  // 获取查勘信息（住宅性）
  getResidenceSurveyData: (data, id) => request('/survey/v1/survey/residence', data, 'GET', id),
  // 保存查勘信息（经营性）
  saveCommercialSurveyData: (data, id) => request('/survey/v1/survey/business', data, 'PUT', id),
  // 保存查勘信息（住宅性）
  saveResidenceSurveyData: (data, id) => request('/survey/v1/survey/residence', data, 'PUT', id),
  // 获取查勘图片
  getSurveyImgs: (data, id) => request('/survey/v1/survey/material', data, 'GET', id),
  // 删除查勘图片
  delSurveyImgs: (data, id) => request('/survey/v1/survey/material', data, 'DELETE', id),
  // 发送信息
  sendMessage: (data) => request('/survey/v1/survey/messages', data),
  // 保存查勘任务人员路径
  saveSurveyPaths: (data) => request('/survey/v1/survey/location', data),
} 