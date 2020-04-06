import request from '@/utils/request'
// 获取角色列表
export function getRolesList(params) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}

// 新建角色
export function rolesAdd(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

// 更新角色信息
export function rolesEdit(id, data) {
  return request({
    url: `/roles/${id} `,
    method: 'put',
    data
  })
}

// 删除指定ID的角色
export function deleteRoles(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

// 获取某个角色的信息
export function getRolesById(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

// 获取系统所有权限
export function getRolesAuth() {
  return request({
    url: '/auth',
    method: 'get'
  })
}

// 角色列表（仅角色名称）
export function getRolesNames(id) {
  return request({
    url: '/role/names',
    method: 'get'
  })
}

// 修改指定ID角色的权限，;id为role_id
export function saveRolesAuth(id, data) {
  return request({
    url: `/auth/${id}`,
    method: 'put',
    data
  })
}
// 获取角色的权限，:id为角色名称
export function getAuthByRoleId(id) {
  return request({
    url: `/auth/${id}`,
    method: 'get'
  })
}
