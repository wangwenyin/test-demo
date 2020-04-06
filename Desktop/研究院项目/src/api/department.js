import request from '@/utils/request'
// 获取部门列表
export function getDepartmentList(params) {
  return request({
    url: '/departments',
    method: 'get',
    params
  })
}

// 新建部门
export function departmentAdd(data) {
  return request({
    url: '/departments',
    method: 'post',
    data
  })
}

// 编辑部门
export function departmentEdit(id, data) {
  return request({
    url: `/departments/${id} `,
    method: 'put',
    data
  })
}

// 删除指定ID的部门
export function deleteDepartment(id) {
  return request({
    url: `/departments/${id}`,
    method: 'delete'
  })
}

// 获取某个部门的信息
export function getDepartmentById(id) {
  return request({
    url: `/departments/${id}`,
    method: 'get'
  })
}
// 部门列表（仅部门名称）
export function getDepartmentName() {
  return request({
    url: '/department/names',
    method: 'get'
  })
}

