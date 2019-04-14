<template>
    <div class="detail_page" v-if="isShow">  
        
            <v-loded :loded="lodding"></v-loded><!--加载遮罩层-->

            <!--头部导航条-->
            <v-back>
                <template v-slot:mainTips>商品详情</template>  
            </v-back>

            <div class="detail_main" >
                <div class="d_m_img" >
                    <img v-lazy="detail_Data.goods.imgUrl"></img>
                </div>
                <div class="d_m_tips">
                    <div class="d_m_name" >
                        {{detail_Data.goods.name}}
                    </div>
                    <div class="d_m_price">
                        <span>￥{{detail_Data.goods.marketPrice|filterValue}}</span>
                        <span class="s_price">零售价</span>
                    </div>
                </div>
                <div class="sale_volums">
                        <span class="s_v_count">销量:&nbsp{{detail_Data.goods.salesVolume}}</span>
                        <span class="s_v_repertory">库存:&nbsp{{detail_Data.goods.inventory}}</span>
                </div>    

                <div class="space"></div>
                <div class="save_count" @click="selected = true">
                        <span>
                            <span>已选</span>
                            <span>数量x{{count}}</span>
                        </span>
                        <span>
                            <span><i class="iconfont">&#xe616;</i></span>
                        </span>
                </div>   
                <div class="space"></div> 

                <div class="specail">
                        <img class="s_img" :src="detail_Data.describe.imgUrl"></img>
                        <p class="s_detail">{{detail_Data.describe.describe}}</p>
                </div>  

                <div class="space"></div>  
                <div class="user_evaluate">
                        <div class="evaluate_box">
                            <span>用户评价({{detail_Data.comment.commentNum}}+)</span>
                            <span @click="$router.push({name:'UserReview',params:{id:detail_ID}})">全部<i class="iconfont">&#xe616;</i></span>
                        </div>
                        <div class="u_e_box">
                                <ul class="u_e_ul">
                                    <li class="u_e_li" v-for="(item,index) in uesr_Evaluate" :key="index">
                                           <img class="e_li_left" :src="item.avator"></img>
                                           <div class="e_li_right">
                                               <div class="li_r_left">
                                                   <span class="r_l_top">{{item.userName}}</span>
                                                   <span class="r_l_middle">{{item.createTime}}</span>
                                                   <span class="r_l_bottom">{{item.content}}</span>
                                               </div>
                                               <div class="li_r_right">
                                                    <i v-for=" (k,index) in item.score" :key="index" class="iconfont">&#xe601;</i>
                                               </div>
                                           </div>
                                    </li>  
                                </ul>
                        </div> 
                </div>
            <div class="space"></div>  
            <div class="d_information">
                <div class="d_i_tips">
                    <span>商品信息</span>
                </div>
                <div class="d_i_content">
                    <ul class="d_i_ul">
                        <li class="d_i_li" v-for="(item,index) in  detail_Data.explain" :key="index">
                             <span>{{item.k}}</span>
                             <span>{{item.v}}</span>
                        </li>
                    </ul>
                </div>
            </div>
          <div class="space"></div>  
          <!--底部图片-->
          <div class="d_pictrue" v-html="detail_Data.goods.details">
          </div> 
        </div> 
        <!--购物车bar-->
        <div class="shop_bar">
            <i class="iconfont">&#xe643;</i>
            <i class="iconfont">&#xe630;</i>
            <i class="iconfont">&#xe610;</i>
            <span style="background:#ccc">加入购物车</span>
            <span style="background:#000000;color:white">立即购买</span>
        </div>
        <div class="select_box" v-if="selected">
            <div class="masked" @click="selected = false"></div>
            <div class="s_m_content">
                <div class="m_c_top">
                    <div class="c_top_img">
                        <img style="width:100%;height:100%" :src="detail_Data.goods.imgUrl"></img>
                    </div>
                    <div class="c_t_right">
                        <div class="t_r_left">
                            <span>￥{{detail_Data.goods.marketPrice|filterValue}}</span>
                            <span class="fontZise">库存:&nbsp{{detail_Data.goods.inventory}}件</span>
                            <span class="fontZise">已选:&nbsp数量x{{count}}</span>
                        </div>
                        <span class="t_r_right" @click="selected = !selected">
                            <i class="iconfont ifont">&#xe602;</i>
                        </span>
                    </div>
                </div>
                <div class="m_c_bottom">
                    <span>购买数量</span>
                    <div>
                        <span @click="count>1?count--:1">
                           <i class="iconfont ifont">&#xe656;</i>
                        </span>
                        <span>{{count}}</span>
                        <span @click="count++"> 
                            <i class="iconfont ifont">&#xe617;</i>
                        </span>
                    </div>
                </div>
          </div>
    </div>
</div>
</template>
<script>
import lodding from "@/components/Common/lodding";
import backTrack from "@/components/Common/backTrack ";

export default {
    data:function(){
        return{
            selected:false,
            lodding:true,
            isShow:false,
            count:1,
            detail_ID:0,
            detail_Data:null
        }
    },
    computed:{
            uesr_Evaluate(){
                return this.detail_Data.comment.comments.splice(0,2);
            }
    },
    created(){
        this.detail_ID = this.$route.query.goodsId;
        this.fetchData();
    },
    methods:{
        fetchData(){
            var url = "https://www.dshui.cc/goodswap/goodsDetail?goodsId="+this.detail_ID;
            this.$axios.get(url).then( result => {
                if(result && result.data.data){
                    var data = result.data.data;
                    if(data.length !== 0){
                        this.detail_Data = result.data.data;
                        this.isShow = true;
                        this.lodding = false;
                    }else{
                        console.log("获取详情页数据有误:" + data);
                    }               
                }          
            }).catch(error =>{
                console.log(error);
            })
        }
    },
    components: {
        'v-loded':lodding,
        "v-back":backTrack
    },
    activated() {
        if(this.$route.meta.isUserCache){
            this.detail_Data = "";
            this.detail_ID = 0;
            this.isShow = false;
            this.detail_ID = this.$route.query.goodsId;
            this.fetchData();
        }
    },
    beforeRouteLeave(to, from, next) {
        if(to.name !== "UserReview"){
            from.meta.isUserCache = true;
        }else{
            from.meta.isUserCache = false;
        }
        next();
    }
}
</script>
<style >
    /*.ifont{
        font-size:0.16rem;
    }*/
    
    .fontZise{
        font-size:0.3rem;
        color:#CECECE;
    }
    .detail_page{
        width:100%;
        min-height:100%;

    }


    .detail_main{
        position:absolute;;
        top:44px;
        left:0;
        right:0;
        bottom:54px;
        z-index:10;
        background:white;
        overflow:auto;
        font-size:0.32rem;
    }
    .d_m_img{
            width:100%;
            box-shadow: 0 0.5px 0.5px #ececec;
    }
    .d_m_img>img{
        width:100%;
        height:100%;
    }

    .d_m_tips{
        width:100%;
        padding: 5px 10px;
        box-sizing:border-box;
        box-shadow: 0 0.5px 0.5px #ececec;
    }

    .d_m_name{
        width:100%;
        height:0.62rem;
        text-align:justify;/*文字对齐*/
        /*文字超出高度后隐藏*/
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .d_m_price{
        width:100%;    
        font-size:0.36rem;
        color:black;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        margin-top:13px;
    }
    .s_price{
        font-size:0.26rem;
        border:1px dotted #808080;
        padding:0.06rem;
        margin-left:0.16rem;
        color:#808080;
    }
    .sale_volums{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        height:0.62rem;
        padding: 5px 10px;
        font-size:0.26rem;
        box-shadow: 0 0.5px 0.5px #ececec;
        color:#808080;
    }

    .s_v_repertory{
        margin-left:0.32rem;
    }

    .save_count{
        width:100%;
        height:0.96rem;
        box-sizing:border-box;
        padding:5px 10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    .space{
        width:100%;
        height:0.16rem;
        display:block;
        background:#ececec;
        content:"";

    }

    .specail{
        width:100%;
        padding:5px 10px;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .s_img{
        width:25%;
        height:50%;
        border-radius:50%;
        box-sizing:border-box;
    }
    .s_detail{
        flex:1;
        color:#808080;
        height:44px;
        line-height:22px;
        text-align:justify;/*文字对齐*/
        /*文字超出高度后隐藏*/
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .user_evaluate{
        width:100%;
    }

    .evaluate_box{
        width:100%;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .u_e_box{
        width:100%;
        box-sizing:border-box;
    }

    .u_e_ul{
        width:100%;
        overflow:auto;
    }

    .u_e_li{
        width:100%;
        height:2.56rem;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        justify-content: flex-start;
        align-items:flex-start;
       border-top:1px solid #ececec;
    }

    .e_li_left{
        width:0.8rem;
        height:0.8rem;
        border-radius:50%;
    }

    .e_li_right{
        width:100%;
        height:100%;
        flex:1;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
    }

    .li_r_left{
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:flex-start;
    }

    .r_l_bottom{
        line-height:20px;
        text-align:justify;/*文字对齐*/
        /*文字超出高度后隐藏*/
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .d_information{
         width:100%;
         display:flex;
         flex-direction:column;
         justify-content:space-between;
         align-items:flex-start;
    }

    .d_i_tips{
        width:100%;
        padding:10px;
        box-sizing:border-box;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        border-bottom:1px solid #ececec;
    }

    .d_i_content{
        width:100%;
        padding:10px;
        box-sizing:border-box;
    }

    .d_i_li{
        box-sizing:border-box;
        display:flex;
        font-size:0.3rem;
        margin-top:10px;
        color:black;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;

    }

    .d_pictrue{
        width:100%;
        box-sizing:border-box;
        overflow:hidden;
    }
    .d_pictrue img{
        width:100%;     
    }

    .shop_bar{
        position:fixed;
        left:0;
        bottom:0;
        right:0;
        height:54px;
        z-index:11;
        background:white;
        display:flex;
        justify-content:flex-start;
        align-items:center;
        box-shadow: 0 -1px 1px #ececec;
    }

    .shop_bar>i{
        font-size:0.62rem;
        width:14%;
        border-right:1px solid #ececec;
    }
    .shop_bar>span{
        font-size:0.32rem;
        color:black;
        width:28%;
        line-height:54px;
        border-right:1px solid #ececec;
    }

    .select_box{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:54px;
        z-index:1000;
    }

    .masked{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: black;
        opacity: 0.5;
    }

    
  .s_m_content{   
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

  .m_c_top{
    width:100%;
    height:70%;
    border-bottom:1px solid #ececec;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:0.4rem;
  }

  .c_top_img{
    width:40%;
    height:100%;
  }

  .c_t_right{    
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.32rem;
    box-sizing: border-box;
    
    color:black;
  }

 .t_r_left{       
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
 }
 .m_c_bottom{ 
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    box-sizing: border-box;
    border-bottom:1px solid #ececec;
    font-size:0.36rem;
 }

</style>