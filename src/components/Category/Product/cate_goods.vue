<template>
    <div class="cate_good" >
        <v-back>
            <template v-slot:mainTips>
                商品列表
            </template>
        </v-back>
        <isTop v-show="isTop" @click.native="backTop"></isTop>
        <div class="goods" ref="cateGoods">  
            <mt-loadmore style="background:white" :top-method="loadTop" :bottom-method="loadBottom" topDropText=""  topPullText=""
                     :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
                    <ul class="goods_ul">
                        <li class="goods_li" v-for="(item,index) in goodsData" :key="index" @click="$router.push({path:'/detail',query:{goodsId:item.id}})">
                                <div class="l_good">
                                    <img style="width:100%;height:100%" :src="item.imgUrl"></img>
                                </div>
                                <div class="r_good">
                                    <div class="r_g_top">{{item.name}}</div>
                                    <div class="r_g_bottom">
                                        <span class="g_b_left">¥&nbsp{{item.marketPrice|filterValue()}}</span>
                                        <span class="g_b_right">已售{{item.salesVolume}}</span>
                                    </div>
                                </div>
                        </li>    
                    </ul>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !=='loading'" :class="{ 'rotate': bottomStatus === 'drop' }">
                             <span v-show="allLoaded">没有更多数据了</span>
                             <span v-show="!allLoaded">加载更多...</span>
                        </span>
                        <span v-show="bottomStatus === 'loading'">Loading...</span>
                    </div>
            </mt-loadmore>
        </div> 
         <v-loded :loded="lodding"></v-loded>
    </div> 
</template>
<script>
import lodding from "@/components/Common/lodding";
import backTrack from "@/components/Common/backTrack ";
import isTop from "@/components/Common/isTop";
export default {
        data:function(){
            return{
                isTop:false,
                lodding:true,//判断数据是否加载完成
                allLoaded:false,
                scrollPosition:0,
                bottomStatus:'',
                cate_id:0,
                pageNumber:1,
                goodsData:[]
            }
        },
        created(){
            this.cate_id = this.$route.query.id;
            this.fetchGoodsData();
        },
        mounted() {
            this.$refs.cateGoods.addEventListener("scroll",this.handleScroll,false);
        },
        methods:{
            fetchGoodsData(){
                var _this = this;
                var url = "https://www.dshui.cc/goodswap/ctgyGoods?ctgyId="+this.cate_id+"&pageNo="+this.pageNumber;
                this.$axios.get(url).then(result => {  
                    if(result && result.data.data.length !== 0){
                        this.goodsData = this.goodsData.concat(result.data.data);  
                        this.lodding = false;
                    }else{
                        this.allLoaded = true;
                    }  
                            
                })
            },
            loadBottom() {
                // 加载更多数据
                if (!this.allLoaded) {
                    this.$refs.loadmore.onBottomLoaded();
                    this.pageNumber++;
                    this.fetchGoodsData();
                }
            },
            loadTop() {
                this.$refs.loadmore.onTopLoaded();
            },
            handleBottomChange(status) {
                // console.log(status);
                this.bottomStatus = status;
                if (this.bottomStatus == "loading") {
                    var _this = this;
                    setTimeout(function() {
                        _this.bottomStatus = "pull";
                    }, 2000);
                }
            },
            handleScroll(){
                this.scrollPosition = this.$refs.cateGoods.scrollTop;
                if (this.scrollPosition > 1000) {
                    this.isTop = true;
                } else {
                    this.isTop = false;
                }
            },
            backTop(){
                this.$refs.cateGoods.scrollTop = 0;
                this.isTop = false;
            }
        },
        components:{
            'v-loded':lodding,
            "v-back":backTrack,
             isTop
        },
        activated() {
            if (this.$route.meta.isUserCache) {
                this.lodding = true;
                this.allLoaded = false;
                this.pageNumber = 1;
                this.goodsData = [];
                this.cate_id = this.$route.query.id;
                this.fetchGoodsData();
            } else{
                this.$refs.cateGoods.scrollTop = this.scrollPosition;
            }
        },
      beforeRouteLeave (to, from, next) {
              /*从category第二次进来后走activated进行请求*/
            if (to && to.path == "/category") {
                from.meta.isUserCache = true;
            } else {
                /*从详情页面进来走缓存*/
                from.meta.isUserCache = false;
            }
            next();
        },
     beforeDestroy(){
          console.log("销毁监听");
          this.$refs.cateGoods.removeEventListener("scroll", this.handleScroll, false);
      }
        
}
</script>
<style>
    .cate_good{
        position:absolute;;
        left:0;
        top:44px;
        right:0;
        bottom:0;
        z-index:10;
        max-width:640px;
        margin:0 auto;
        background:white;
        overflow:hidden;
        font-size:1.6rem;
    }

    .goods{
        width:102%;
        height:100%;
        overflow:auto;
    }
    

    .goods_li{
        width:100%;
        height:11rem;
        display:flex;
        justify-content:flex-start;
        padding:10px;
        box-sizing:border-box;
        box-shadow: 0 0.5px 0.5px #ececec;
    }

    .l_good{
        width:25%;
        height:100%;
        box-sizing:border-box;
    }
    .r_good{
        width:75%;
        height:100%;
        padding:10px 10px 0 10px;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:center;
        box-sizing:border-box;
    }
    .r_g_top{
        width:100%;
        height:50%;
        box-sizing:border-box;
        text-align:justify;/*文字对齐*/
        line-height:20px;
        font-size:1.2rem;
        /*文字超出高度后隐藏*/
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        overflow:hidden;
        text-overflow:ellipsis;
        
    }

    .r_g_bottom{
        width:100%;
        height:50%;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .g_b_left{
        color:black;
    }

    .g_b_right{
        font-size:1.2rem;
        
    }

</style>
