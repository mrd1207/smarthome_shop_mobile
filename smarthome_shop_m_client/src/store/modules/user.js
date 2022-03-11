

export default {
    state: {
        // namespaced: true,
        profile: {
            token:'',
            id: '',
            user_address: '',
            user_avatar: '',
            user_birthday: '',
            user_name: '',
            user_nickname: '',
            user_phone: '',
            user_sex: '',
            user_sign: ''
        }
    },
    mutations: {
        // 修改用户信息，payload就是用户信息对象
        setUser(state, payload) {
            state.profile = payload
            // console.log('state.profile: ', state.profile);
        },
    },
    actions: {
    },
}