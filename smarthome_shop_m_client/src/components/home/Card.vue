<template>
    <div class="title">
        <slot>
            
        </slot>
    </div>
</template>

<style scoped>
.title{
    font-size: 0.6125rem;
    text-align: center;
}
span{
    position: relative;
}
.title span::before{
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: silver;
    border-radius: 50%;
    position: absolute;
    top: 45%;
    right: 0rem;
    margin-bottom: 1px;
}
.title span::after{
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: silver;
    border-radius: 50%;
    position: absolute;
    top: 45%;
    left: 0rem;
}
</style>
