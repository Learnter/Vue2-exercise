<template>
    <div class="bottom_bar">
        <ul class="list_bar">
            <li v-for="(item,index) in list" :key="index" @click="change_bar(item)">
                    <img :src="isselet == item.title?item.selected_img:item.img" alt="item.title">  
            </li>                   
        </ul>
    </div>
</template>
<script>
import con1 from "@/assets/image/tab_home.png";
import con2 from '@/assets/image/tab_cate.png';
import con3 from "@/assets/image/tab_discovery.png";
import con4 from "@/assets/image/tab_cart.png";
import con5 from "@/assets/image/tab_me.png";
import con1_active from "@/assets/image/tab_home_active.png";
import con2_active from "@/assets/image/tab_cate_active.png";
import con3_active from "@/assets/image/tab_discovery_active.png";
export default {
    name:"bottom_bar",
    data:function(){
        return{
            list:[
                {id:0,path:"/firstPage",title:"首页",img:con1,selected_img:con1_active},
                {id:1,path:"/category",title:"分类",img:con2,selected_img: con2_active},
                {id:2,path:"/discover",title:"发现",img:con3,selected_img: con3_active},
                {id:3,path:"/shopping_cart",title:"购物车",img:con4,selected_img:con3_active},
                {id:4,path:"/main",title:"我的",img:con5,selected_img:con3_active}
            ],
            isselet:'首页'
        }
    },
    methods:{
        change_bar:function(item){
            this.isselet = item.title;
            this.$router.push(item.path);
        }
    },
    mounted() {
        if(location.hash){
            switch(location.hash.slice(1)) {
                case "/firstPage" :
                    this.isselet = "首页";
                    break;
                case "/category" :
                    this.isselet = "分类";
                    break;
                case "/discover" :
                    this.isselet = "发现";
                    break;
                case "/shopping_cart" :
                    this.isselet = "购物车";
                    break;
                case "/main" :
                    this.isselet = "我的";
                    break;
            }
        }
    }  
}
</script>
<style scoped>
    .bottom_bar{
        position:fixed;
        bottom:0px;
        right:0px;
        width:100%;
        height:64px;
        box-shadow:0 -0.5px 1px gray;
        background:white;
    }
    .list_bar{
        width:100%;
        height:100%;
        list-style:none;
        display:flex;
        justify-content:space-around;
        align-items:center;
        box-sizing:border-box;
    }
    .list_bar>li{
        width:100%;
        height:100%;
    }

    .list_bar>li>img{
       height:100%;
       width:100%;
    }
</style>

