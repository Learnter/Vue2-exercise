<template>
    <div class="a_templace3">
        <v-back>
            <template v-slot:mainTips>
                {{$route.query.title}}
            </template>
        </v-back>

        <v-loded :loded="lodding"></v-loded><!--加载遮罩层-->

        <div class="activity_main" ref="activity">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" topLoadingText="" topDropText="" topPullText="" :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
                <div class="activity_m_top">
                    <div>
                         <img :src="activity_Data.dimg"></img>
                    </div>
                    <div class="m_top_right backColor">
                        <img :src="activity_Data.logo"></img>
                        <p>{{activity_Data.summary}}</p>
                    </div>
                </div>
                <div class="activity_m_bottom">
                    <ul class="m_bottom_ul">
                        <li class="m_bottom_li backColor" v-for="(item,index) in splitData" :key="index" @click="$router.push({path:'/detail',query:{goodsId:item.goodsId}})">
                            <img :src="item.goods.imgUrl"></img>
                            <p>{{item.goods.name}}</p>
                            <div>
                                <span>￥&nbsp{{item.goods.marketPrice|filterValue()}}</span>
                                <span class="fontZise">已售{{item.goods.salesVolume}}</span>
                            </div>
                        </li>
                    </ul> 
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !=='loading'" :class="{ 'rotate': bottomStatus === 'drop' }">
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
import lodding from "@/components/Common/lodding";
export default {
    data() {
        return {
            lodding:true,
            isShow: false,
            pageNumber: 1,
            allLoaded: false,/*数据是否获取完*/
            bottomStatus: '',/*上拉底部的状态值*/
            scrollPosition:0,
            activity_ID: 0,
            activity_Data:"",
            splitData: [],
        }
    },
    created(){
        this.activity_ID = this.$route.query.id;
        this.fetchData();
        this.fetchBottomData();
    },
    mounted() {
        this.$refs.activity.addEventListener("touchmove",this.handleScroll,false);
    },
    methods: {
        fetchData() {
            var url = "https://www.dshui.cc/adwap/loadAd?adid="+this.activity_ID+"&token=";
            this.$axios.get(url).then((result) => {
                this.$nextTick(() => {
                    this.activity_Data = result.data.data;
                    this.isShow = true;
                })
                
            })
        },
        fetchBottomData() {
            var url = "https://www.dshui.cc/adwap/queryAdGoods?adid="+this.activity_ID+"&pageNo="+this.pageNumber+"&token=";
            this.$axios.get(url).then((result) => {
                this.$nextTick( () => {
                    if (result && result.data.data) {
                        var data = result.data.data;
                        if (data.length > 0) {
                            this.splitData = this.splitData.concat(result.data.data);
                            this.lodding = false;
                        } else {
                            // 若数据已全部获取完毕 
                            this.allLoaded = true;
                        }
                    } 
                }) 
            })
        },
        loadBottom() {
            // 加载更多数据
            if (!this.allLoaded) {
                this.$refs.loadmore.onBottomLoaded();
                this.pageNumber++;
                this.fetchBottomData();
            }
        },
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
            if(status == "loading"){
                 this.$refs.loadmore.onBottomLoaded();
            }
           
        },
        handleScroll(e){
            this.scrollPosition = this.$refs.activity.scrollTop;
        }
    },
    components: {
        "v-back": backTrack,
         "v-loded": lodding
    },
    activated() {
        if(this.$route.meta.isUserCache){
            this.lodding = true;
            this.scrollPosition = 0;
            this.isShow = false;
            this.pageNumber = 1;
            this.activity_Data = "";
            this.splitData = [];
            this.activity_ID = this.$route.query.id;
            this.fetchData();
            this.fetchBottomData();
        }else{
            this.$refs.activity.scrollTop = this.scrollPosition;
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.name !== "Detail"){
            from.meta.isUserCache = true;
        }else{
            from.meta.isUserCache = false;
        }
        next();
    },
    destroyed() {
        this.$refs.activity.removeEventListener("touchmove", this.handleScroll, false);
    }
}
</script>
<style>
    .fontZise{
        font-size:1.3rem;
        color:#CECECE;
    }
     img{
         width:100%;
     }

    .backColor{
         background:white;
     }

    .a_templace3 {
        position:absolute;
        top:44px;
        right: 0;
        left: 0;
        bottom: 0;
        max-width:640px;
        margin:0 auto;
        z-index: 10;
        background:#f0f0f0;
        overflow:hidden;
        font-size:1.6rem;
    }

    .activity_main {
        width:100%;
        height:100%;
        padding-right:3%;      
        overflow-y:scroll;
    }
    .m_top_right{
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:1.6rem;
        box-sizing:border-box;
        margin-top:10px;
    }

    .m_top_right>img{
        width:20%;
    }
    .m_top_right>p{
        text-align:justify;
        font-size:1.5rem;
        line-height:22px;
        font-family:行楷;
        color:black;
    }

    .activity_m_bottom{
        width:100%;
        height:100%;
    }

    .m_bottom_ul{
        width:100%;
        height:100%;
        padding:15px 8px 0;
        box-sizing:border-box;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
    }


    .m_bottom_li{
        width:49%;
        height:100%;
        margin:0 0 2%;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
    .m_bottom_li>p{
        width:100%;
        height:44px;
        line-height:22px;
        font-size:1.5rem;
        color:black;
        padding:0 5px;
        box-sizing:border-box;
        text-align:justify;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;/*显示几行*/
        overflow:hidden;
    }

    .m_bottom_li>div{
        width:100%;
        padding:10px 5px;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
    }
</style>