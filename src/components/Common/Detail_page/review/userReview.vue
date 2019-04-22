<template>
    <div class="userReview">
        <v-loded :loded="lodding"></v-loded><!--加载遮罩层-->
        <isTop v-show="backTop" @click.native="returnTop"></isTop>
        <v-back>
            <template v-slot:mainTips>
                用户评论
            </template>
        </v-back>      
        <div class="u_r_box"  >
           <!-- <div class="u_r_main">
                    <ul class="u_r_ul" ref="reviewBox">
                        <li class="u_r_li" v-for="(item,index) in reviewData" :key="index">
                            <img class="r_li_left" :src="item.avator"></img>
                            <div class="r_li_right">
                                <div class="li_l_left">
                                    <span class="r_l_top">{{item.userName}}</span>
                                    <span class="r_l_middle">{{item.createTime}}</span>
                                    <span class="r_l_bottom">{{item.content}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>-->
                
                <mt-loadmore  class="u_r_main" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                 @bottom-status-change="handleBottomChange" :bottomDistance = "b_Distance"  ref="loadmore">
                    <ul class="u_r_ul">
                        <li class="u_r_li" v-for="(item,index) in reviewData" :key="index">
                            <img class="r_li_left" :src="item.avator"></img>
                            <div class="r_li_right">
                                <div class="li_l_left">
                                    <span class="r_l_top">{{item.userName}}</span>
                                    <span class="r_l_middle">{{item.createTime}}</span>
                                    <span class="r_l_bottom">{{item.content}}</span>
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
    </div>
</template>
<script>
import backTrack from "@/components/Common/backTrack ";
import lodding from "@/components/Common/lodding";
import isTop from "@/components/Common/isTop";
export default {
    data:function(){
        return{
            b_Distance:50,/*上拉加载移动的距离*/
            allLoaded:false,/*数据是否获取完*/
            bottomStatus:'',/*上拉底部的状态值*/
            backTop:false,
            lodding:true,
            reviewData:[],
            reviewID:null,
            pageNumber:1,
            

        }
    },
    props:['id'],
    created(){
       this.reviewID = this.id;
       this.fetchData();
    },
    mounted() {
        this.$refs.loadmore.$el.addEventListener("touchmove",this.handdleScroll,false);
    },
    methods:{
        returnTop(){
            this.backTop = false;/*火箭按钮隐藏*/
            this.$refs.loadmore.$el.scrollTop = 0;/*滚动元素的距离设置为0*/
        },
        fetchData(){
            var url = "https://www.dshui.cc/goodswap/queryComment?goodsId="+this.reviewID+"&pageNo="+this.pageNumber;
            // console.log("用户评论页的url:"+url);
            this.$axios.get(url).then((result) => {
                // console.log(result.data.data);
                if( result && result.data.data.length == 0){
                    this.allLoaded = true;
                }else{
                     this.reviewData = this.reviewData.concat(result.data.data);                  
                }

                 this.lodding = false;
              
            })
        },
         loadBottom() {
            // 加载更多数据
            this.pageNumber++;
            this.fetchData(); 
            // 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
        },
         handleBottomChange(status) {
             this.bottomStatus = status;
         },
         handdleScroll(){
             var scroll =  this.$refs.loadmore.$el.scrollTop;
             if(scroll && scroll > 500){
                 this.backTop = true;
             }else{
                 this.backTop = false;
             }
         }
    },
    components:{
        "v-back":backTrack,
        "v-loded":lodding,
        isTop
    }
}
</script>
<style scoped>
  .userReview{
      position:fixed;
      left:0;
      top:0;
      right:0;
      bottom:0;
      z-index:100;
      background:white;
      font-size:1.6rem;
      
  }    
  .u_r_box{
      position:absolute;
      left:0;
      top:44px;
      right:0;
      bottom:0;
      box-sizing:border-box;  
       
  }  
  
  .u_r_main{
       width:102%;
       height:100%;  
       max-width:640px;
       margin:0 auto;
       overflow-y:scroll; 
      -webkit-overflow-scrolling: touch;
            
    }

  .u_r_ul{
      width:100%;
      height:100%;
      box-sizing:border-box;
  }
  .u_r_li{
    width:100%;
    height:12.5rem;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    justify-content: flex-start;
    align-items:flex-start;
    border-top:1px solid #ececec;
  }
  .r_li_left{
        width:4rem;
        height:4rem;
        border-radius:50%;
  }
  .r_li_right{
        width:100%;
        height:100%;
        flex:1;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
  }

  .li_l_left{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:flex-start;
  }

</style>