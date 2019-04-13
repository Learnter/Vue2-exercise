<template>
    <div class="search_box">
            <input type="text" placeholder="搜索你的宝贝"  disabled>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
        .search_box{
            background:white;
            width:100%;
            height:50px;
            border-bottom:0.5px solid #ececec;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .search_box>input{
            width:70%;
            height:50%;
            border-radius:0.3rem;
            padding-left:1rem;
            background:#F5F5F5;
            outline:none; /*边框轮廓*/
            border-style:none;
        }
</style>
