import request from '@/utils/request'

// 添加购物车
export const addCart = (params) => {
    return request('/add_cart', 'post', params);
}

// 删除购物车
export const deleteCart = (params) => {
    return request('/deleteCart', 'post', params);
}
// 修改购物车
export const updateCart = (params) => {
    return request('/change_goods_count', 'post', params);
}
//查询购物车
export const findCartGoods = (params) => {
    return request('/cart_goods', 'get', params);
}



