import axios from 'axios'
import { Indicator } from 'mint-ui';
import store from '@/store'
export const baseURL = 'http://127.0.0.1:3000'
const instance = axios.create({
    // axios 的一些配置，baseURL  timeout
    baseURL,
    timeout: 5000
})
//http request 拦截器
instance.interceptors.request.use(
        
    config => {
        Indicator.open('加载中...');// 这里需要注意，必须return config才能生效
        const { profile } = store.state.user;
        if (profile.token) {
        config.headers.token = profile.token;
        
        // config.headers
        console.log('config.headers: ', config.headers);
        }
        

        // if( options.headers.token ){
        //     options.headers.token = store.state.user.token;
        //     if( !options.headers.token ){
        //        router.push('/login');
        //    }
        // }
        return config;

    },
    error => {
        setTimeout(() => {
            Indicator.close();
        }, 500);
        return Promise.reject(err);
    }
);

//http response 拦截器
instance.interceptors.response.use(
    response => {
        setTimeout(() => {
            Indicator.close();
        }, 500);
        return response;
    },
    error => {
        setTimeout(() => {
            Indicator.close();
        }, 500);
        return Promise.reject(error)
    }
)

// 请求工具函数
export default (url, method, submitData) => {
    // 负责发请求：请求地址，请求方式，提交的数据
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // method参数：get,Get,GET  转换成小写再来判断
        // 在对象，['params']:submitData ===== params:submitData 这样理解
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })

}