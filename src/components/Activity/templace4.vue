<template>
    <div class="templace4" ref="templace4">
        <v-back>
            <template v-slot:mainTips>
                {{$route.query.title}}
            </template>
        </v-back>
        <isTop v-show="isTop" @click.native="backTop"></isTop>
        <div class="templace4_main">
           <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" topDropText="" topPullText="" :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
                <div class="templace4_m_bottom">
                    <ul class="m_bottom_ul">
                        <li class="m_bottom_li backColor" v-for="(item,index) in template4_Data" :key="index" >
                           <img v-lazy="item.img"></img>
                        </li>
                    </ul>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !=='loading'">
                        <span v-show="allLoaded">没有更多数据了</span>
                        <span v-show="!allLoaded">加载更多...</span>
                    </span>
                    <span v-show="bottomStatus === 'loading'">Loading...</span>
                </div>
            </mt-loadmore>
      </div>      
    </div>
</template>
<script>
import backTrack from "@/components/Common/backTrack ";
import isTop from "@/components/Common/isTop";
export default {
   data(){
       return{
            isTop:false,
            allLoaded:false,
            bottomStatus:'',
            template4_ID:'',
            template4_Data:[],
            pageNumber:1
       }
   },
   created() {
       this.template4_ID = this.$route.query.id;
       this.fetchData();
   },
   mounted() {
       this.$refs.templace4.addEventListener("scroll",this.handleScroll,false);
   },
   methods:{
        fetchData(){
            var url = "https://www.dshui.cc/adwap/loadAdsByPadid?padid="+this.template4_ID+"&pageNo="+this.pageNumber+"&token=";
            this.$axios.get(url).then((result) => {
                if(result && result.data.data.length !== 0){
                    this.template4_Data = this.template4_Data.concat(result.data.data);
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
                this.fetchData();
            }
        },
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
        },
        handleBottomChange(status) {
            // console.log(status);
            this.bottomStatus = status;
        },
        handleScroll(){
            var scrollPosition = this.$refs.templace4.scrollTop;
            if(scrollPosition > 1000){
                this.isTop = true;
            }else{
                this.isTop = false;
            }
        },
        backTop(){
            this.$refs.templace4.scrollTop = 0;
            this.isTop = false;
        }
   },
   components:{
       isTop,
       "v-back":backTrack
   },
   activated() {
       if(this.$route.meta.isUserCache){
            this.pageNumber = 1;
            this.template4_Data = [];
            this.template4_ID = this.$route.query.id;
            this.fetchData();
       }
   },
   beforeRouteLeave (to, from, next) {
        /*从firstPage第二次进来后走activated进行请求*/
       if (to && to.path == "/firstPage") {
           from.meta.isUserCache = true;
       } else {
           /*从详情页面进来走缓存*/
           from.meta.isUserCache = false;
       }
       next();
   }    
}
</script>
<style>
    .templace4{
        position:absolute;
        left:0;
        bottom:0;
        right:0;
        top:44px;
        background:#f0f0f0;
        z-index:10;
        max-width:640px;
        margin:0 auto;
        overflow:auto;
    }

    .templace4_m_bottom{
        width:100%;
        height:100%;
    }

    .m_bottom_ul{
        width:100%;
        display:flex;
        flex-wrap:wrap;
        overflow:auto;
    }

    .m_bottom_li{
        width:33.33%;
        border-bottom:1px solid #f0f0f0;
        border-right:1px solid #f0f0f0;
        box-sizing:border-box;
        overflow:hidden;
    }

    img{
        width:100%;
        height:100%;
    }

</style>