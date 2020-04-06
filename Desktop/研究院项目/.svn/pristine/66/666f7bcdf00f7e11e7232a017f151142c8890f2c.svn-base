import request from '@/utils/request'
// 根据任务编号查询估价对象净值测算相关信息
export function getNetWorth(taskId) {
  return request({
    url: `/singleapp/networth/${taskId}`,
    method: 'get'
  })
}

// 根据任务编号，提交估价对象的净值测算结果及相关参数
export function saveNetWorth(taskId, data) {
  return request({
    url: '/singleapp/networth/' + taskId,
    method: 'put',
    data
  })
}
