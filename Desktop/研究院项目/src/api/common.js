// 公共api
import request from '@/utils/request'

// 获取数据字典内容
export function getDictionary(name) {
  return request({
    url: `/dictionary/${name}`,
    method: 'get'
  })
}
