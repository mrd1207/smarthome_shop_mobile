<template>
    <ul class="icons">
       <li v-for="(item,index) in cateInfo" :key='index'>
           <img :src="item.cate_icons" alt="">
           <div class="icon-font">{{item.cate_name}}</div>
       </li>
   </ul>
   
   
</template>
<script>
export default {
    props:{
        cateInfo:Array
    },
    data(){
        return{
        }
    }
}
</script>

<style scoped>
    .icons{
        position: relative;
        /* top: 2.8rem; */
        display: flex;
        justify-content: space-around;
        padding:0.4rem 0;
        
        
    }
    .icons li{
        display: flex;
	    flex-direction: column;
	    align-items: center;
    }
    .icons li img{
        width: .825rem;
         height: .825rem;
         padding: .125rem;
         
    }
    .icon-font{
        font-size: .225rem;
    }
</style>