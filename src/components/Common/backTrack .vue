<template>
    <div class="backTrack">
         <div class="d_p_head">
                <div class="d_p_left" @click="$router.go(-1)">
                    <i class="iconfont">&#xe700;</i>
                </div>
                <div class="d_p_main">  
                        <slot name="mainTips"></slot>
                </div>
                <div class="d_p_right">
                    <i class="iconfont">&#xe6e7;</i>
                </div>
            </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style>
    .d_p_head{ 
        position:fixed;
        left:0;
        top:0;
        right:0;
        height:44px;
        max-width:640px;
        margin:0 auto;
        display:flex;
        justify-content:space-around;
        align-items:center;
        box-shadow: 0 1px 1px #ccc;
        background: #F8F8F8;
        font-size:1.5rem;
    }

    .d_p_main{
        width:70%;
        height:100%;
        text-align:center;
        line-height:44px;
    }
    
    .d_p_left>i{
        font-size:2rem;
    }
    .d_p_right>i{
        font-size:3rem;
    }

</style>