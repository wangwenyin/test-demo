import request from '@/utils/request'

// 获取模糊匹配的推荐小区名称列表
export function getSuggestionProjectName(params) {
  return request({
    url: '/enquiry/project',
    method: 'get',
    params
  })
}

// 获取模糊匹配的推荐楼栋名称列表
export function getSuggestionBuildingName(params) {
  return request({
    url: '/enquiry/building',
    method: 'get',
    params
  })
}

// 获取模糊匹配的推荐户名称列表
export function getSuggestionHouseName(params) {
  return request({
    url: '/enquiry/house',
    method: 'get',
    params
  })
}

// 获取楼盘信息
export function getProjectInfo(prj_no, data) {
  return request({
    url: '/data/projects/' + prj_no,
    method: 'post',
    data
  })
}

// 获取楼盘列表
export function getProjects(data) {
  return request({
    url: '/data/projects',
    method: 'post',
    data
  })
}

// 根据条件获取楼盘列表信息
export function getProjectsList(params) {
  return request({
    url: '/data/projects',
    method: 'get',
    params
  })
}
// 根据条件获取土地列表信息
export function getLandsList(params) {
  return request({
    url: '/data/lands',
    method: 'get',
    params
  })
}

// 根据楼盘代码获取楼盘详细信息
export function projectInfo(prj_no) {
  return request({
    url: '/data/projects/' + prj_no,
    method: 'get'
  })
}

// 根据楼盘代码和用途获取楼栋列表信息
export function getBuildingsList(params) {
  return request({
    url: '/data/buildings',
    method: 'get',
    params
  })
}

// 根据楼栋代码获取楼栋详细信息
export function buildingInfo(id) {
  return request({
    url: '/data/buildings/' + id,
    method: 'get'
  })
}

// 根据楼盘代码和用途获取楼栋列表信息
export function buildingHouses(params) {
  return request({
    url: '/data/units',
    method: 'get',
    params
  })
}

// 根据宗地号获取土地详细信息
export function landInfo(id) {
  return request({
    url: '/data/lands/' + id,
    method: 'get'
  })
}

// 编辑楼盘
export function projectEdit(id, data) {
  return request({
    url: `/data/projects/${id} `,
    method: 'put',
    data
  })
}

// 编辑土地
export function landEdit(id, data) {
  return request({
    url: `/data/lands/${id} `,
    method: 'put',
    data
  })
}

// 编辑楼栋
export function buildingEdit(id, data) {
  return request({
    url: `/data/buildings/${id} `,
    method: 'put',
    data
  })
}

// 根据条件查询评估价格
export function getAppraisedvalues(params) {
  return request({
    url: '/data/appraisedvalues',
    method: 'get',
    params
  })
}

// 根据条件查询评估价格
export function getStructures(params) {
  return request({
    url: '/data/structures',
    method: 'get',
    params
  })
}

// (楼栋)数据导入
export function importation(data) {
  return request({
    url: '/data/importation/tasks',
    method: 'post',
    data
  })
}

// 删除导入失败的数据
export function deleteImportation(flag, data) {
  return request({
    url: `/data/importation/task/${flag}`,
    method: 'delete',
    data
  })
}

// 根据房地产类型获取检验字段
export function getImportationFields(prop) {
  return request({
    url: `/data/importation/fields/${prop} `,
    method: 'get'
  })
}
// 根据数据类型获取模板url
export function getImportationTemplate(type) {
  return request({
    url: `/data/importation/tasks/${type} `,
    method: 'get'
  })
}

// 导入数据-属性编辑  数据检查并导入
export function submitImportation(type) {
  return request({
    url: `/data/importation/review/${type} `,
    method: 'put'
  })
}

// 导入数据-属性编辑-楼盘  根据条件查询楼盘
export function getImportationProjects(params) {
  return request({
    url: '/data/importation/projects',
    method: 'get',
    params
  })
}

// 导入数据-属性编辑-楼盘  新增楼盘
export function addImportationProjects(data) {
  return request({
    url: '/data/importation/projects',
    method: 'post',
    data
  })
}

// 导入数据-属性编辑-楼盘  更新某楼盘属性
export function editImportationProjects(prj_no, data) {
  return request({
    url: `/data/importation/projects/${prj_no} `,
    method: 'put',
    data
  })
}

// 导入数据-属性编辑-楼盘  删除某楼盘
export function deleteImportationProjects(prj_no, data) {
  return request({
    url: `/data/importation/projects/${prj_no}`,
    method: 'delete',
    data
  })
}

// 导入数据-属性编辑-宗地  根据条件查询宗地
export function getImportationLands(params) {
  return request({
    url: '/data/importation/lands',
    method: 'get',
    params
  })
}

// 导入数据-属性编辑-宗地  更新某楼盘属性
export function editImportationLands(parcel_no, data) {
  return request({
    url: `/data/importation/lands/${parcel_no} `,
    method: 'put',
    data
  })
}

// 导入数据-属性编辑-宗地  删除某楼盘
export function deleteImportationLands(parcel_no, data) {
  return request({
    url: `/data/importation/lands/${parcel_no}`,
    method: 'delete',
    data
  })
}

// 导入数据-属性编辑-楼栋  根据条件查询楼栋
export function getImportationBuildings(params) {
  return request({
    url: '/data/importation/buildings',
    method: 'get',
    params
  })
}

// 导入数据-属性编辑-楼栋  更新某楼栋属性
export function editImportationBuildings(bldg_no, data) {
  return request({
    url: `/data/importation/buildings/${bldg_no} `,
    method: 'put',
    data
  })
}

// 导入数据-属性编辑-楼栋  删除某楼栋
export function deleteImportationBuildings(bldg_no, data) {
  return request({
    url: `/data/importation/buildings/${bldg_no}`,
    method: 'delete',
    data
  })
}

// 导入数据-属性编辑-户  根据条件查询户
export function getImportationUnits(params) {
  return request({
    url: '/data/importation/units',
    method: 'get',
    params
  })
}

// 导入数据-属性编辑-户  更新某户属性
export function editImportationUnits(house_no, data) {
  return request({
    url: `/data/importation/units/${house_no} `,
    method: 'put',
    data
  })
}

// 导入数据-属性编辑-户  删除某户
export function deleteImportationUnits(house_no, data) {
  return request({
    url: `/data/importation/units/${house_no}`,
    method: 'delete',
    data
  })
}

// 导入数据-属性编辑-构筑物  根据条件查询构筑物
export function getImportationStructures(params) {
  return request({
    url: '/data/importation/structures',
    method: 'get',
    params
  })
}

// 导入数据-属性编辑-构筑物  更新某构筑物属性
export function editImportationStructures(struc_no, data) {
  return request({
    url: `/data/importation/structures/${struc_no} `,
    method: 'put',
    data
  })
}

// 导入数据-属性编辑-构筑物  删除某构筑物
export function deleteImportationStructures(struc_no, data) {
  return request({
    url: `/data/importation/structures/${struc_no}`,
    method: 'delete',
    data
  })
}

// 导入数据-案例匹配  根据条件查案例
export function getImportationCasesNew(params) {
  return request({
    url: '/data/importation/cases/new',
    method: 'get',
    params
  })
}

// 导入数据-案例匹配  根据案例房地产名称查询楼盘名称
export function getImportationCasesPrjname(params) {
  return request({
    url: '/data/importation/cases/prjname',
    method: 'get',
    params
  })
}

// 导入数据-案例匹配  更新某构筑物属性
export function editImportationCases(struc_no, data) {
  return request({
    url: `/data/importation/cases/${struc_no} `,
    method: 'put',
    data
  })
}

// 导入数据-案例匹配  根据案例房地产名称查询楼盘名称
export function getImportationCases(params) {
  return request({
    url: '/data/importation/cases',
    method: 'get',
    params
  })
}

// 导入数据-案例匹配  根据案例房地产名称查询楼盘名称
export function setImportationCasesMatching(case_no, data) {
  return request({
    url: `/data/importation/cases/${case_no} `,
    method: 'put',
    data
  })
}
