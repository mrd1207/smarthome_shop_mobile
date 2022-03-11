import request from '@/utils/request'

export const findBanner=()=>{
    return request('/homecasual','get');
}

export const searchGoods = (params) => {
    return request('/searchgoods', 'post', params);
  }

  export const Category = () => {
    return request('/category', 'get');
  }

 

  export const Homeshoplist = () => {
    return request('/homeshoplist', 'get');
  }