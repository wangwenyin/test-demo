import request from '@/utils/request'
// 获取问答列表
export function getFaqs(params) {
  return request({
    url: '/public_service/faqs',
    method: 'get',
    params
  })
}
// 修改问答
export function updateFaqs(id, data) {
  return request({
    url: '/public_service/faqs/' + id,
    method: 'put',
    data
  })
}

// 根据id获取问答的详细内容，:id为faq_id
export function getFaqsById(id, params) {
  return request({
    url: `/public_service/faqs/${id}`,
    method: 'get',
    params
  })
}

// 新建问答
export function addFaqs(data) {
  return request({
    url: '/public_service/faqs',
    method: 'post',
    data
  })
}
