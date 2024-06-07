import request from './request'

export function LoginApi(data:any) {
  console.log(request)
  return request({
    url: '/card/list',
    method: 'post',
    baseURL: '/mock',
    data
  })
}