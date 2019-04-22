<template> 
    <div class="cate_main">   
        <div class="right_content" ref="category_right">    
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  
                topLoadingText="" topDropText="" topPullText="" :auto-fill="false"
                bottomPullText="" bottomDropText="" bottomLoadingText="" ref="loadmore">    

                <ul class="cate_main_ul">
                    <li class="cate_main_li" v-for="(item,index) in cateData" :key="index" @click="btlist(item.id)">
                        <div class="main_li_box">
                            <div class="box_img">
                                <img :src="item.imgUrl"></img>
                            </div>
                            <span>{{item.name}}</span>
                        </div>
                    </li>
                </ul>
                
            </mt-loadmore>  
        </div>      
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
        mounted() {
            this.$refs.category_right.addEventListener("scroll",this.handleScroll,false);
        },
        activated() {
            this.$refs.category_right.scrollTop = this.rightPositon;
        }
}
</script>
<style lang="scss" scoped> 
    .cate_main {
        width:110%;
        height:100%;
        font-size:1rem;
        overflow:hidden;
        .right_content{
            width:100%;
            height:100%;
            overflow-y:scroll;
            -webkit-overflow-scrolling:touch;    
            .cate_main_ul {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            box-sizing: border-box;
            .cate_main_li {
                width: 33%;
                height: 130px;
                box-sizing: border-box;
                .main_li_box {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    font-size: 1rem;
                    color: #6B6B6B;
                    box-sizing: border-box;
                    .box_img {
                        width: 100%;
                        height: 75%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                     }
                  }
               }
            }
         }        
     }

</style>
