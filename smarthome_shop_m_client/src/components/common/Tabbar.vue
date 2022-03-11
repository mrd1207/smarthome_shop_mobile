<template>
    <div class='tabbar'>
        <ul>
            <li 
                v-for='(item,index) in routerList' 
                :key='index'
                @click="switchTab(item.path)"
            >
            
                <img :src="$route.path.includes(item.path)?item.selected:item.active" alt="">
                <span :class='$route.path.includes(item.path)?"active":""'>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            routerList:[
                {
                    title:'首页',
                    path:'/home',
                    active:require('../../../public/images/home.png'),
                    selected:require('/public/images/home-select.png')
                },
                {
                    title:'分类',
                    path:'/list',
                    //active:'../../../public/images/list.png',
                    active:require("../../../public/images/list.png"),
                    selected:require('../../../public/images/list-select.png')
                },
                {
                    title:'购物车',
                    path:'/cart',
                    active:require("../../../public/images/cart.png"),
                    selected:require('../../../public/images/cart-select.png')
                },
                {
                    title:'我的',
                    path:'/user',
                    active:require("../../../public/images/my.png"),
                    selected:require('../../../public/images/my-select.png')
                },
            ]
        }
    },
     methods:{
        switchTab(path){
            if(this.$router.path==path)return;
            console.log(path);
            console.log(this.$router.path);
            this.$router.replace(path);
        }
    }
   
}
</script>

<style scoped>
.tabbar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width:  100%;
    height: 1.2125rem;
    padding-bottom: .2125rem;
    background-color: #fff;
    
}
.tabbar ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

}
.tabbar ul li{

    display: flex;
    flex-direction: column;
    text-align: center;
}
.tabbar ul li img{
    width: .755rem;
    height: .755rem;
}
.tabbar ul li span{
	font-size:0.3rem;
}
.active{
    color:red;
}
</style>