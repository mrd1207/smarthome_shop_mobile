import { findCategoryGoods } from '../../api/category'


export default {
    state: {
        namespaced: true,
        list: []
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        }
    },
    actions: {
        async getList(context, obj) {
            // let categoryParam = `category=` + obj.category;
            // console.log('categoryParam: ', categoryParam);
          
            // 获取分类数据
            const res = await findCategoryGoods(obj);
            // console.log('data: ', res.data.message);
            context.commit('setList', res.data.message); 
            // return new Promise((resolve, reject) => {
            //     let categoryParam = `category=` + obj.categoryNum;
            //     findCategoryGoods(categoryParam).then(res => {
            //         context.commit('setList', res.data.message);
            //         resolve(res.data.message)
            //     })
            // })
        }
    },
}
// searchGoods(keywordsParam).then((res) => {

//     if (res.data.success_code) {
//         this.$router.push({
//             name: "sList",
//             query: { key: this.searchVal },
//             params: {
//                 slist: res.data.message,
//             },
//         });