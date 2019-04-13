<template>
    <div class="lode" v-if="loded">
        <span>
            <!--努力加载中...-->
        </span>
    </div>
</template>
<script>
export default {
   props:["loded"]
}
</script>
<style>   
.lode{
    position:absolute;;
    top:200px;
    left:50%;
    transform:translate(-50%,-50%);
    background: #333333;
    z-index:998;
    border-radius:10px;
    overflow:hidden;
}
.lode>span {
    width:150px;
    height:100px; 
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:white;
    background:url("../../assets/image/5-1503130Q912-50.gif") 50% no-repeat;
    background-size:contain;
    
}

.fontSize{
    font-size:2rem;
    margin-bottom:1rem;
}

</style>