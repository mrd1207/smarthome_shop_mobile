// /create_order_m
import request from '@/utils/request'

export const createOrder = (params) => {
    return request('/create_order_m', 'post', params);
}



export const updateOrderAddress = (params) => {
    return request('/update_order_address_m', 'post', params);
}



export const findOrderId = (params) => {
    return request('/find_order_m', 'post', params);
}



export const submitOrder = (params) => {
    return request('/submit_order_m', 'post', params);
}


export const goPayment = (params) => {
    return request('/payment', 'post', params);
}

export const successPayment = (params) => {
    return request('/payment_success', 'post', params);
}