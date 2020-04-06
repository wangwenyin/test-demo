// 比例分析相关接口
import request from '@/utils/request'
// 根据条件查询价格指数列表
export function getPriceIndexList(params) {
  return request({
    url: '/massapp/indexes',
    method: 'get',
    params
  })
}
// 根据指数ID查询指数值
export function getPriceIndexById(id, params) {
  return request({
    url: `/massapp/indexes/${id}/edit`,
    method: 'get',
    params
  })
}

// 添加或修改指数值
export function addOrUpdateIndex(data) {
  return request({
    url: '/massapp/indexes',
    method: 'post',
    data
  })
}

// 更新价格指数详情
export function updatePriceIndexDetailById(id, data) {
  return request({
    url: `/massapp/indexes/${id}`,
    method: 'put',
    data
  })
}
// 根据指数ID查询价格指数详情
export function getPriceIndexDetailById(id) {
  return request({
    url: `/massapp/indexes/${id}`,
    method: 'get'
  })
}
// 获取模板url
export function downloadTemplate() {
  return request({
    url: `/massapp/indexes/template/builtcost`,
    method: 'get'
  })
}
// 上传修改使用年期或容积率（删除当前数据，重新填充）
export function uploadTemplate(data) {
  return request({
    url: `/massapp/indexes/builtcost`,
    method: 'post',
    data
  })
}
// 查询建安造价指数信息
export function getBuiltCostList(id, params) {
  return request({
    url: `/massapp/indexes/builtcost/${id}`,
    method: 'get',
    params
  })
}
// 修改建安造价指数信息
export function updateBuiltCostList(id, data) {
  return request({
    url: `/massapp/indexes/builtcost/${id}`,
    method: 'put',
    data
  })
}

