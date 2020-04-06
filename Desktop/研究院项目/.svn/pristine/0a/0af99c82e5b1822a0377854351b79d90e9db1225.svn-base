// 比例分析相关接口
import request from '@/utils/request'

// 2019/03/20
// 根据任务ID查询任务详情
export function getRatioTaskById(taskId) {
  return request({
    url: `/ratioanalysis/tasks/${taskId}`,
    method: 'get'
  })
}

// 获取检验审核任务列表
// params  {name:任务名称  creator:创建人员  usage:物业用途 }
export function getRatioTaskList(params) {
  return request({
    url: '/ratioanalysis/tasklist',
    method: 'get',
    params
  })
}

// 保存检验审核任务，以及提交任务进入下一步
export function saveRatioTasks(data) {
  return request({
    url: '/ratioanalysis/tasks',
    method: 'post',
    data
  })
}
// 根据参数设置计算比率分析结果
export function computeRatioResult(taskId, data) {
  return request({
    url: `/ratioanalysis/tasks/${taskId}`,
    method: 'put',
    data
  })
}

// 查询比率分析结果
export function getRatioResult(params) {
  return request({
    url: `/ratioanalysis/tasks`,
    method: 'get',
    params
  })
}

// 案例查询（案例概况）
//
export function getCaseSurvey(params) {
  return request({
    url: '/ratioanalysis/tasks/new',
    method: 'get',
    params
  })
}

// 案例查询（ 地图模式）
//
export function getCaseShow(params) {
  return request({
    url: '/ratioanalysis/tasks/new',
    method: 'get',
    params
  })
}

// 完成比率分析，并提交检验审核结论
// params = { id: '任务编号', result: '结论'
export function submitResult(id, data) {
  return request({
    url: `/ratioanalysis/tasksubmit/${id}`,
    method: 'put',
    data
  })
}

// 删除某比率分析任务
export function deleteRatioResult(id, data) {
  return request({
    url: `/ratioanalysis/tasks/${id}`,
    method: 'delete',
    data
  })
}

