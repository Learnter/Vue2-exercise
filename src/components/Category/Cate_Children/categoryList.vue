<template> 
    <div class="cate_main" ref="category_right">
        <ul class="cate_main_ul">
            <li class="cate_main_li" v-for="(item,index) in cateData" :key="index" @click="btlist(item.id)">
                <div class="main_li_box">
                    <div class="box_img">
                         <img style="width:100%;height:100%" v-lazy="item.imgUrl"></img>
                    </div>
                    <span>{{item.name}}</span>
                </div>
            </li>
        </ul>
    </div> 
</template>
<script>
export default {
        data(){
            return{
                 rightPositon:0   
            }
        },
        props:["cateData"],
        methods:{
            btlist(value){
                    this.$router.push({path:"/cate_goods",query:{id:value}});
            },
            handleScroll(){
                this.rightPositon =  this.$refs.category_right.scrollTop;
            }
        },
        mounted() {
            this.$refs.category_right.addEventListener("scroll",this.handleScroll,false);
        },
        activated() {
            this.$refs.category_right.scrollTop = this.rightPositon;
        },
}
</script>
<style scoped>   
    .cate_main {
        width: 103%;
        height: 100%;
        padding:0.2rem 0.2rem 0;
        box-sizing:border-box;
        overflow:auto;
        font-size:0.32rem;
    }

    .cate_main_ul {
        width:100%;
        height:100%;
        display: flex;
        flex-wrap:wrap;
        align-content:flex-start;
        box-sizing:border-box;
    }

    .cate_main_li {
        width:33.33%;
        height:2.6rem;
        box-sizing:border-box;
    }

    .main_li_box {
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        font-size:0.3rem;
        color:#6B6B6B;
        box-sizing:border-box;
    }

    .box_img{
        width:100%;
        height:75%;
    }
    img{
        width:100%;
        height:100%;
    }
</style>
