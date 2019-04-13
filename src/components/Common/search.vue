<template>
    <div class="searchBox">
         <input type="text" placeholder="搜索喜欢的宝贝" disabled>
         <span>注册</span>
    </div>
</template>
<script>
export default {
     name:"searchBox",
}
</script>
<style scoped>
    .searchBox{
        width:100%;
        height:3rem;
        display: flex;
        align-items:center;
        margin:5px 0 5px 0;
    }
    .searchBox>input{
        margin-left:20px;
        width:70%;
        height:70%;
        margin-right:18px;
        border-style:none;
        background-color:whitesmoke;
        padding-left:2rem;
    }
    .searchBox>span{
        font-size:1.1rem;
        color:gray;
    }
</style>
