<template>
    <div class="category">
            <search-top class="search" @click.native ="$router.push({name:'Search_box'})"></search-top>
            <div class="category_main">
                    <div class="cate_Aside" ref="category_left">
                            <ul class="cate_list">
                                <li class="cate_li" v-for="(item,index) in category_list" id="item.id" :key="item.id" @click="toggle_list(index,item.id)">
                                   <span :class="selected == index?'active':''"> {{item.name}} </span>
                                </li>
                            </ul>
                    </div>       
         </div>  
         <div class="main"  >
                     <component v-bind:is="tabComponent" :cateData="mainData"></component>     
         </div>   
    </div> 
</template>
<script>
        /*右侧动态组件*/
import category_list from './Cate_Children/categoryList';
import cateGlobal from "./Cate_Children/cateGlobal";
import searchTop from "../common/searchTop";

export default {
    data:function(){
        return{
            leftPosition:0,
            rightPosition:0,
            parentId:4,
            selected:0,
            category_list:null,
            mainData:null,
            tabComponent:"category_list"
        }
    },
    created(){
        /*获取左侧边栏数据*/
        this.getCategory();
        /*获取右侧边栏数据*/
        this.getMainData();
    },
    mounted() {
        this.$refs.category_left.addEventListener("scroll",this.handleScroll,false);
    },
    activated() {
         this.$refs.category_left.scrollTop = this.leftPosition;
    },
    methods:{
        getCategory(){
            var _this = this;
            var url = "https://www.dshui.cc/goodswap/allCtgy?&token=";
            this.$axios.get(url).then( cateVal => {
               _this.category_list = cateVal.data.data;

            })
        },
        getMainData(){
            var _this = this;
            var url = "https://www.dshui.cc/goodswap/subCtgyList?parentId="+this.parentId+"&token=";
            this.$axios.get(url).then(mainData => {
                _this.mainData = mainData.data.data;
                // console.log(_this.mainData);
            })
        },
        toggle_list(index,id){
            /*点击切换class*/
            this.selected = index;
            /*点击获取对应数据*/
            this.parentId = id;
            /*点击动态切换右侧component*/
            if(index != 1){   
                this.tabComponent = "category_list";
            }else{
                this.tabComponent = "cateGlobal";
            }
            /*获取数据*/
            this.getMainData();
        },
        handleScroll(value){
            this.leftPosition = this.$refs.category_left.scrollTop;

        }
    },
    components:{
        category_list,
        cateGlobal,
        searchTop
    }
  
}
</script>
<style scoped>
    .category{
        width:100%;
        height:100%;
        font-size:0.32rem;
    }

    .category_main{
        position:absolute;
        width:27%;
        left:0;
        top:52px;
        bottom:64px;
        border-right: 1px solid #f2f2f2;
        box-sizing:border-box;
        overflow:hidden;
    }
    .cate_Aside{
        width:110%;
        height:100%;
        overflow-y:scroll;    
    }

    .cate_list{
        width:100%;
        height:100%;
        box-sizing:border-box;
    }

    .cate_li{
        width:100%;
        height:20px;
        margin:20px 0px;
        text-align:center;
        line-height:20px;
    }

    .active{
        display:block;
        width:90%;
        font-weight:bold;
        border-radius:15px;
        background:linear-gradient(90deg,#000,#232321);
        color:white;
        padding:0.06rem 0;
    }

    .main{
        position:absolute;
        width:73%;
        right:0;
        top:52px;
        bottom:64px;
        box-sizing:border-box;
        overflow:hidden;
    }
    .search{
        position:fixed;
        left:0;
        top:0;
        right:0;
    }
    

</style>
