import request from '@/utils/request'

// 根据地图范围查询楼盘及案例数量信息
export function getProjectsByExtent(params) {
  return request({
    url: '/data/case/rect',
    method: 'get',
    params
  })
}

// 根据用户输入楼盘名称查询楼盘列表及案例均价、数量统计
export function getCasesProjectList(params) {
  return request({
    url: '/data/case/project',
    method: 'get',
    params
  })
}

// 查询某个楼盘的案例列表
export function getCasesList(params) {
  return request({
    url: '/data/cases',
    method: 'get',
    params
  })
}

// 楼盘名称模糊查询(添加案例)
export function getProject_list(params) {
  return request({
    url: '/data/case/project_list',
    method: 'get',
    params
  })
}

// 楼栋名称模糊查询(添加案例)
export function getBuilding_list(params) {
  return request({
    url: '/data/case/building_list',
    method: 'get',
    params
  })
}

// 户名称模糊查询(添加案例)
export function getUnit_list(params) {
  return request({
    url: '/data/case/unit_list',
    method: 'get',
    params
  })
}

// 添加案例
export function addCases(data) {
  return request({
    url: '/data/cases',
    method: 'post',
    data
  })
}

// 案例查询（ 地图模式）(比率分析模块跳转)
export function getProjectsForRatio(params) {
  return request({
    url: '/ratioanalysis/tasks/new',
    method: 'get',
    params
  })
}

// 获取模糊匹配的推荐小区名称列表
export function getSuggestionProjectName(params) {
  return request({
    url: '/case/findprj',
    method: 'get',
    params
  })
}

// 获取模糊匹配的推荐小区名称列表
export function getProjectByBuffer(params) {
  return request({
    url: '/case/nearby',
    method: 'get',
    params
  })
}

// 获取数据字典内容
export function getDictionary(name) {
  return request({
    url: `/dictionary/${name}`,
    method: 'get'
  })
}

// 获取楼盘案例详情数据
export function getCases(prj_no, params) {
  return request({
    url: '/case/cases/' + prj_no,
    method: 'get',
    params
  })
}

// 获取行政区数据
export function getXzqs(params) {
  return request({
    url: '/case/district',
    method: 'get',
    params
  })
}

// 街道办
export function getJdbs(params) {
  return request({
    url: '/case/subdis',
    method: 'get',
    params
  })
}

// 楼盘
export function getProjects(params) {
  return request({
    url: '/case/findprj',
    method: 'get',
    params
  })
}
