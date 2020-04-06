import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      login_name: username,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/' + token,
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'get',
    params: { token }
  })
}
