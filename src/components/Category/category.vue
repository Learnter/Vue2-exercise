<template>
    <div class="category">      
                <div class="cate_content"> 
                    <div class="cateTop">
                        <div class="cate_Search" @click.native="$router.push({name:'Search_box'})">
                            <i class="iconfont searchI">&#xe609;</i>
                            <div>搜索喜欢的宝贝</div>
                        </div>
                    </div>
                    
                    <div class="cate_main">
                        <div class="main_left">
                          <div class="cate_Aside" ref="category_left">    
                            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  
                                topLoadingText="" topDropText="" topPullText="" :auto-fill="false"
                                bottomPullText="" bottomDropText="" bottomLoadingText="" ref="loadmore">  
                             
                                <ul class="cate_list">
                                    <li class="cate_li" v-for="(item,index) in category_list" id="item.id" :key="item.id" @click="toggle_list(index,item.id)">
                                        <span :class="selected == index?'active':''"> {{item.name}} </span>
                                    </li>
                                </ul>

                            </mt-loadmore>  
                        </div>                      
                    </div>  

                    <div class="main_right"  >
                                <component v-bind:is="tabComponent" :cateData="mainData"></component>     
                    </div> 

                </div>
         </div>     
    </div> 
</template>
<script>
        /*右侧动态组件*/
import category_list from './Cate_Children/categoryList';
import cateGlobal from "./Cate_Children/cateGlobal";

export default {
    data:function(){
        return{
            leftPosition:0,
            rightPosition:0,
            parentId:4,
            selected:0,
            category_list:null,
            mainData:null,
            tabComponent:"category_list",
            option:{
                topLoadingText:"",
                topDropText:"",
                topPullText:"",
                autoFill:false

            }
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

        },
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            // 加载更多数据
            if (!this.allLoaded) {
                this.$refs.loadmore.onBottomLoaded();
            }
        },
    },
    components:{
        category_list,
        cateGlobal,
    }
  
}
</script>
<style lang="scss" scoped>
    .category{
        position: relative;
        width: 100%;
        height: 100%;
        background: #fff;
        color: #000;
        max-width:640px;
    }
    .cate_content{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:64px;
        max-width:640px;
        margin: 0 auto;
        background: #fff;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:flex-start;
        font-size:1.5rem;

    }
    .cateTop{
        width:100%;
        max-width: 640px;
        min-height:34px;
        background: #fff;
        color: #000;
        display:flex;
        justify-content:center;
        align-items:center;
           border-bottom: 1px solid #f2f2f2;
        .cate_Search{
            width:60%;
            height:100%;
            padding:5px 0;
            box-sizing:border-box;
            border-radius:8px;
            display:flex;
            justify-content: flex-start;
            align-items:center;
            background:#F0f0f0;
            
        }
    }
    .cate_main{
        display:flex;
        justify-content:flex-start;
    }
    .main_left{
        width:27%;
        border-right: 1px solid #f2f2f2;
        box-sizing:border-box;
        overflow:hidden;
    }
    .cate_Aside{
        width:110%;
        height:100%;
        overflow-y:scroll;    
        -webkit-overflow-scrolling:touch;
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

    .main_right{
        flex:1;
        padding:1rem 1rem 0; 
        overflow:hidden;
    }
    .search{
        position:absolute;;
        left:0;
        top:0;
        right:0;
        max-width:640px;
        margin:0 auto;
    }
    

</style>
