import request from '@/utils/request'

export const findGoodsDetail = (params) => {
    return request('/goodsdetail', 'get', params)
  }
  export const findGoodsComment = (params) => {
    return request('/goodscomment', 'get', params)
  }

