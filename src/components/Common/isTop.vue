<template>
    <div class="backTop" >
          <img src="../../assets/image/timg.png"></img>
    </div>  
</template>
<script>
export default {
  name:"backTop"
}
</script>
<style scoped>
    .backTop{
        width:50px;
        height:50px;
        border-radius:50%;
        background-color:whitesmoke;
        position: fixed;
        right:20px;
        bottom:100px;
        opacity:0.8;
        font-size:1rem;
        font-weight:bold;
        z-index:9999;
    }
    .backTop>img{
        width:100%;
    }
</style>
