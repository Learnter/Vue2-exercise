<template>
  <div class="templace1" >
      <v-back>
            <template v-slot:mainTips>
                {{$route.query.title}}
            </template>
        </v-back>
        <isTop v-show="isTop" @click.native="backTop"></isTop>
      <div class="activity_main"  ref="activity"> 
        <div class="activity_box" v-if="activity_Data" >
            <img style="width:100%;height:100%" :src="activity_Data[0].img"></img>
            <ul class="a_b_ul">
                <li class="a_b_li" v-for="(item,index) in splitData" :key="index" @click="$router.push({path:'/detail',query:{goodsId:item.goodsId}})">
                    <img style="width:100%;height:100%" v-lazy="item.img"></img>
                </li>
            </ul>
        </div>
        <div class="recommend">
              <span>特别推荐</span>
        </div>
        <div class="activity_bottom"  >
            <ul class="a_bottom_ul" >
                <li class="a_bottom_li" v-for="(item,index) in bottom_Data" :key="index" @click="$router.push({path:'/detail',query:{goodsId:item.goodsId}})">
                    <div class="a_bottom_li_img">
                         <img  style="width:100%;height:100%" v-lazy="item.goods.imgUrl"></img>
                    </div>      
                   <div class="a_bottom_li_name">{{item.goods.name}}</div>
                   <div class="a_bottom_li_details">
                       <span>￥&nbsp{{item.goods.marketPrice|filterValue}}</span>
                       <span class="fontZise">
                           已售{{item.goods.salesVolume}}
                       </span>
                   </div> 
                </li>
            </ul>
            <div class="lodedMore">
                <span v-show="isBottom">加载更多...</span>
                <span v-show="!isBottom">没有更多数据了</span>
            </div>
        </div> 
     </div>   
  </div>
</template>
<script>
import backTrack from "@/components/Common/backTrack ";
import isTop from "@/components/Common/isTop";
export default {
  data(){
      return{
        isShow:false,  
        isTop:false,
        isBottom:true,
        scrollPositon:0,/*滚动到的位置*/
        activity_ID:0,
        activity_Data:[{img:''}],
        bottom_Data:[],
        activity_Number:1
      }
  },
  created() {
      this.activity_ID = this.$route.query.id;
      this.fetchData();
      this.fetchBottomData();    
  },
  mounted(){       
        this.$refs.activity.addEventListener("touchmove", this.handleScroll, false);            
  },
  computed:{
      splitData(){
          return this.activity_Data.slice(1)
      }
  },
  methods:{
    fetchData(){
         var _this = this;
         var url = "https://www.dshui.cc/adwap/queryAdGoodsBig?adid="+this.activity_ID+"&token=";
         this.$axios.get(url).then((result) => {
                if(result && result.data.data.length !== 0){
                    this.isShow = true; 
                    this.activity_Data = result.data.data; 
                    // console.log(this.activity_Data);      
                }
                
         })
     },
    fetchBottomData(){
         var _this = this;
         var url = "https://www.dshui.cc/adwap/queryAdGoods?adid="+ this.activity_ID+"&pageNo="+this.activity_Number+"&token=";
         this.$axios.get(url).then((result) => {
             if(result && result.data.data.length == 0){
                    _this.isBottom = false;
             }else{               
                 _this.bottom_Data = _this.bottom_Data.concat(result.data.data);
             }  
         })
     },
    handleScroll(){
         this.scrollPositon = this.$refs.activity.scrollTop;

         if(this.$refs.activity.scrollTop > 1000){
             this.isTop = true;
             if(this.$refs.activity.scrollTop + window.innerHeight >= this.$refs.activity.scrollHeight -1){
                   this.activity_Number++;
                   this.fetchBottomData();
             }
         }else{
             this.isTop = false;
         }
     },
     backTop(){
         /*回顶操作*/
        var _this = this;
        var clearTop = setInterval(function(){        
             if(_this.$refs.activity.scrollTop <= 0){
                _this.isTop = false;
                clearInterval(clearTop);
             }else{
                _this.$refs.activity.scrollTop -= 1000;
             }
         },200);             
     }
  },
  components:{
      "v-back":backTrack,
      isTop
  },
  activated() {
      if(this.$route.meta.isUserCache){
            console.log("第二次从首页进入活动页");  
            this.activity_ID = this.$route.query.id;  
            this.activity_Number = 1;   
            this.activity_Data = null;
            this.bottom_Data = [];
            this.fetchData();
            this.fetchBottomData();
            
      }else{
            this.$refs.activity.scrollTop = this.scrollPositon;
      }
  },
  beforeRouteLeave (to, from, next) {
      /*从firstPage第二次进来后走activated进行请求*/
      if( to && to.path == "/firstPage"){
            from.meta.isUserCache = true;
      }else{
        /*从详情页面进来走缓存*/
          from.meta.isUserCache = false;
      }
      next();
  },
  beforeDestroy() {
      this.$refs.activity.removeEventListener("touchmove", this.handleScroll, false);
  }
}
</script>
<style>
    .templace1{
        position:absolute;;
        top:44px;
        right:0;
        left:0;
        bottom:0;
        background:green;
        z-index:10;
        max-width:640px;
        margin:0 auto;
        overflow:hidden;
        font-size:1.6rem;
    }

    .activity_main{
        width:100%;
        height:100%;
        overflow-y:scroll;
    }
    .recommend{
        width:100%;
        height:4.8rem;
        line-height:4.8rem;
        font-size:1.6rem;
        text-align:center;
        background:black;
        color:yellow;
        margin:1.6rem 0;
    }
    .a_b_ul{
        width:100%;
        display:flex;
        flex-wrap:wrap;
    }
    
    .a_bottom_ul{
       width:100%;
       padding: 0 8px;
       box-sizing: border-box;
       display:flex;
       flex-wrap:wrap;
       justify-content:space-between;
    }
   
    .a_bottom_li{
        width:49%;
        margin:0 0 2%;
        border-radius:3px;
        box-sizing:border-box;
        background:white;
        display:flex;
        flex-direction:column;
        
    }
    .a_bottom_li_name{
        color: #333;
        font-size:1.5rem;
        height: 46px;
        line-height: 23px;
        margin:5px 0 10px 5px;
        overflow: hidden;
        text-align:justify;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
    }

    .a_bottom_li_details{
        display:flex;
        justify-content:space-between;
        color:#000;
        font-size:1.3rem;
        height:24px;
        line-height:24px;
        padding: 5px 3px; 
        font-size:1.8rem;      
    }

    .fontZise{
        font-size:1.3rem;
        color:#CECECE;
    }
</style>
