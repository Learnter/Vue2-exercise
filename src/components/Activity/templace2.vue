<template>
    <div class="a_templace2">
        <v-back>
            <template v-slot:mainTips>
                {{$route.query.title}}
            </template>
        </v-back>
        <div class="activity_main" ref="activity">         
            <mt-loadmore style="background:white" :top-method="loadTop" :bottom-method="loadBottom" topDropText=""  topPullText=""
            :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
                    <img style="width:100%;height:100%" :src="activity_Data.dimg"></img>
                    <ul class="a_b_ul">
                        <li class="a_b_li" v-for="(item,index) in splitData" :key="index" @click="$router.push({path:'/detail',query:{goodsId:item.goodsId}})">
                            <img style="width:100%;height:100%" v-lazy="item.img"></img>
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
    </div>
</template>
<script>
import backTrack from "@/components/Common/backTrack ";
export default {
    data() {
        return {
            isShow: false,
            pageNumber:1,
            allLoaded:false,/*数据是否获取完*/
            bottomStatus: '',/*上拉底部的状态值*/
            activity_ID:0,
            activity_Data:[],
            splitData:[],
        }
    },
    created() {
        this.activity_ID = this.$route.query.id;
        this.fetchData();
        this.fetchBottomData();
    },
    methods: {
        fetchData() {
            var url = "https://www.dshui.cc/adwap/loadAd?adid="+this.activity_ID+"&token=";
            this.$axios.get(url).then((result) => {
                this.activity_Data = result.data.data;
                this.isShow = true;
            })  
        },
        fetchBottomData(){
            var _this = this;
            var url= "https://www.dshui.cc/adwap/queryAdGoods?adid=" + this.activity_ID + "&pageNo=" + this.pageNumber + "&token=";
            // console.log(url);
            this.$axios.get(url).then((result) => {
                if (result && result.data.data.length !== 0) {
                    _this.splitData = _this.splitData.concat(result.data.data);            
                } else {
                    // 若数据已全部获取完毕
                    _this.allLoaded = true;
                }

            })
        },
        loadBottom() {
            // 加载更多数据
            if(!this.allLoaded){
                this.$refs.loadmore.onBottomLoaded();
                this.pageNumber++;
                this.fetchBottomData();
            }         
        },
        loadTop(){
            this.$refs.loadmore.onTopLoaded();
        },
        handleBottomChange(status) {
            // console.log(status);
            this.bottomStatus = status;
            if(status == "loading"){
              this.$refs.loadmore.onBottomLoaded();
            }
        }
    },
    components: {
        "v-back": backTrack
    } 
}
</script>
<style>
.a_templace2{
    position:absolute;
    top:44px;
    right: 0;
    left: 0;
    bottom: 0;
    background:#ccc;
    z-index:10;
    max-width:640px;
    margin:0 auto;
    overflow:hidden;
    font-size:1.6rem;
}

.activity_main {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.a_b_ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.a_bottom_ul {
    display: flex;
    flex-wrap: wrap;
}

.a_bottom_li {
    width: 48%;
    margin-left: 2%;
    margin-bottom: 2%;
    border-radius: 3px;
    box-sizing: border-box;
    background: white;
    display: flex;
    flex-direction: column;
}
</style>