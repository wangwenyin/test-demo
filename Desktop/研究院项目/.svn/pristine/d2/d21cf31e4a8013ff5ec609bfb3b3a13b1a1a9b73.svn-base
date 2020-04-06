import request from '@/utils/request'
export function getUsers(params) {
  return request({
    url: '/public_service/users',
    method: 'get',
    params
  })
}
// 修改指定用户状态，:id为用户名（手机号码）
export function updateUser(username, data) {
  return request({
    url: '/public_service/users/' + username,
    method: 'put',
    data
  })
}

// 获取小程序指定用户信息，:id为用户名（手机号码）
export function getUserById(id, params) {
  return request({
    url: `/public_service/users/${id}`,
    method: 'get',
    params
  })
}
