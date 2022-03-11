import request from '@/utils/request'

export const findCategoryGoods = (params) => {
    return request('/categorylist', 'get', params)
  }

