import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/ums/session',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/ums/session/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/ums/session',
    method: 'delete'
  })
}
