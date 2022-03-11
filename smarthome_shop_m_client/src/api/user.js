import request from '@/utils/request'


export const loginPwd = (params) => {
  // 账号密码登录
  return request('/login_pwd_noc', 'post', params);
}
// 获取验证码
export const sendPhoneCode = (params) => {
  return request('/code', 'post', params);
}
// 验证码登录
export const loginCode = (params) => {
  return request('/login_code_noc', 'post', params);
}
// 注册
export const register = (params) => {
  return request('/register', 'post', params);
}
// 核对密码
export const checkPwd = (params) => {
  return request('/check_pwd', 'post', params);
}
//设置新密码
export const setNewPwd = (params) => {
  return request('/set_pwd', 'post', params);
}
// 改密码
export const changePwd = (params) => {
  return request('/change_pwd', 'post', params);
}
// 提交反馈
export const submitFeedback = (params) => {
  return request('/user_feedback', 'post', params);
}
// 加入购物车

