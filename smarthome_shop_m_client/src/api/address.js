
import request from '@/utils/request'

// 添加购物车
export const addAddress = (params) => {
    return request('/insert_address', 'post', params);
}

// 删除购物车
// export const deleteCart = (params) => {
//     return request('/deleteCart', 'post', params);
// }
// // 修改购物车
// export const updateCart = (params) => {
//     return request('/change_goods_count', 'post', params);
// }
//查询购物车
export const findAddressList = () => {
    // console.log(1);
    return request('/user_address_m', 'get');
}



export const setDefaultAddress = (params) => {
    return request('/default_address', 'post', params);
}



export const editAddress = (params) => {
    return request('/edit_address', 'post', params);
}

export const deleteAddress = (params) => {
    return request('/delete_address', 'post', params);
}
