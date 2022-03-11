// import { map } from "core-js/core/array";

export default {
    state: {
        // namespaced: true,
        cartList: [],
        selectList: []
    },
    getters: {
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.cartList.forEach(element => {
                if (element.checked) {
                    total.price += element.buy_count * element.price;
                    total.num++;
                }
            })
            return total;
        },
        delGoods(state) {
            return state.cartList.filter(Element => Element.checked);
        }
    },
    mutations: {
        setCartList(state, list) {
            state.cartList = list;
        },
        setSelectList(state,list){
            state.selectList=list;
        }
    },
    actions: {
       
    },
}