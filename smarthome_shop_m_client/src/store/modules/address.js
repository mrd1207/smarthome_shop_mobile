import { findAddressList } from "@/api/address";

export default {
    state: {
        fullAddress: [],
        addressList: [],
        orderAddress: {}
    },
    getters: {
        getOrderAddress(state) {
            state.orderAddress = state.fullAddress.find(element =>element.is_default == 1);
            console.log('state.orderAddress: ', state.orderAddress);
            return state.orderAddress?state.orderAddress:state.fullAddress[0]
        }
    },
    mutations: {
        setAddressList(state, list) {
            state.addressList = list;
            console.log('state.addressList: ', state.addressList);
        },
        setFullAddress(state, list) {
            state.fullAddress = list;
            console.log('state.fulladdressList: ', state.fullAddress);
        },
        setOrderAddress(state,obj){
            state.orderAddress=obj;
            console.log(' state.orderAddres: ',  state.orderAddress);
        }
    },
    actions: {
        AddressLists(ctx) {
            return new Promise((resolve, reject) => {
                findAddressList().then(res => {
                    console.log('addres: ', res);
                    ctx.commit('setFullAddress', res.data.message)
                    ctx.state.orderAddress=ctx.getters.getOrderAddress;
                    resolve();
                })
            })
        }


    }

}
