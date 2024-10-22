import axios, { AxiosRequestConfig, Method } from 'axios'

/* 
  取消重复请求
*/
interface PendingType {
  url?: string,
  method?: Method,
  params: any,
  data: any,
  cancel: Function
}
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

/* 
  创建axios实例
*/
const instance = axios.create({
  timeout: 1000*10
})

/* 
  移除重复请求
*/
const removePending = (config:AxiosRequestConfig) => {
  for (const key in pending) {
    const item:number = +key
    const list:PendingType = pending[key]
    if (
      list.url === config.url
      && list.method === config.method
      && JSON.stringify(list.params) === JSON.stringify(config.params)
      && JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel('操作太频繁，请稍后再试')
      if (pending.length > 1) pending.splice(item, 1)
    }
  }
}

/* 
  添加请求拦截器
*/
instance.interceptors.request.use(request => {
  removePending(request)
  request.cancelToken = new CancelToken(c => {
    pending.push({
      url: request.url,
      method: request.method,
      params: request.params,
      data: request.data,
      cancel: c
    })
  })
  return request
}, error => Promise.reject(error))

/* 
  添加响应拦截器
*/
instance.interceptors.response.use(response => {
  removePending(response.config)
  const errorCode = response?.data?.errorCode
  switch(errorCode) {
    case 401: 
      break;
    default:
      break;
  }
  return response
}, error => {
  const response = error.response
  // 根据返回的http状态码做不同的处理
  switch (response?.status) {
    case 400:
      //  页面找不到
      break;
    case 401:
      // token失效
      break;
    case 403:
      // 没有权限
      break;
    case 500:
      // 服务端错误
      break;
    case 503:
      // 服务端错误
      break;
    default:
      // 接口异常
      break;
  }
  // 超时重新请求
  const config = error.config
  // 
  const [RETRY_COUNT, RETRY_DELAY] = [0, 1000]
  if (config && RETRY_COUNT) {
    // 重试计数的变量
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= RETRY_COUNT) {
      return Promise.reject(response || { message: error.message })
    }
    config.__retryCount++
    const backOff = new Promise<void> (resolve => {
      setTimeout(() => {
        resolve()
      }, RETRY_DELAY || 1)
    })
    return backOff.then(() => {
      return instance(config)
    })
  }
  return Promise.reject(response || { message: error.message })
})

export default instance
