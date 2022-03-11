<template>
    <div class="header">
        <img src="../../../public/images/logo.png" alt="">
        <div class="search" @click="goSearch">
            <i class="iconfont icon-fangdajing"></i>
            <span>搜索...</span>
        </div>
        <div class="kefu">
            <i class="iconfont icon-kefu"></i>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goSearch(){
            this.$router.push('/search');
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* position: fixed;
    top: 0;
    left:0; */
    background-color: #1d6cd5;
    width: 100%;
    height: 1.241rem;
    /* z-index: 100; */
    
}
.header img{
    height: 100%;
}

.kefu i{
    font-size: .825rem;
    color: white;
    margin-right: .125rem;
}
.search{
    width: 70%;
    height: .860rem;
    background-color:white;
    border-radius: .3125rem;
    display: flex;
    align-items: center;
}
.search i{
    padding-left: .125rem;
    font-size: .625rem;
    color: rgb(182, 182, 182);
}
.search span{
    padding-left: .125rem;
    font-size: .425rem;
    color: rgb(182, 182, 182);
}
</style>