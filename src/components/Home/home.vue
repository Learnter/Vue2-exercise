<template>
    <div class="home" v-if="isShow" >
        <!--一键回顶-->
        <isTop v-show="backTop" @click.native="returnTop"></isTop>

        <!--搜索框--> 
        <div class="searchBox">
            <i class="iconfont searchI">&#xe609;</i>
            <input type="text" placeholder="搜索喜欢的宝贝" @click="$router.push({name:'Search_box'})">
            <span>注册</span>
        </div>

        <!--轮播图-->
        <div class="swiper">      
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index ) in swiperSlides" :key="index">
                    <img @click = "$router.push({path:'/activity/templace1',query:{id:item.rule.adid,title:item.title}})" :src="item.img" alt="加载失败"></img>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>

        <!--公告框-->
        <div class="notice">

            <span>NOTICE</span>

            <div class="text-container" >
                <transition class="inner-container2" name="slide" mode="out-in">
                    <p class="notice_list" :key="text.id">{{text.val}}</p>
                </transition>
            </div>

        </div>

        <!--新品专区-->
        <div class="newArrival">
                 <ul>
                    <li v-for="(item,index) in newArrival " :key="index"  >
                        <img @click ="$router.push({path:'/activity/templace2',query:{id:item.adid,title:item.title}})" v-if="item.dimg" :src="item.img"></img> 
                        <div v-else>
                                <p class="newArrTitle">{{item.title}}</p>
                                <p class="newArrSub">{{item.subtitle}}</p>
                                <img @click="index!==(newArrival.length-1)?$router.push({path:'/activity/templace4',query:{id:item.adid,title:item.title}}):''" v-lazy="item.img"></img>
                        </div>   
                    </li>
                 </ul>     
        </div>

        <!--热卖专区-->
            <div class="hostSale">
                        <h1 class="tips">超值热卖</h1>
                        <ul>
                            <li @click ="$router.push({path:'/activity/templace3',query:{id:item.adid,title:item.title}})" v-for="(item,index) in hostSale" :key="index">
                                 <div class="hostList">
                                    <img v-lazy="item.img"></img>
                                    <p class="newArrTitle">{{item.title}}</p>
                                    <p class="newArrSub">{{item.subtitle}}</p>
                                  </div>   
                            </li>
                        </ul>
            </div>

            <!--底部提示-->
            <div class="bottomTips" v-if="bottomTips">
                    <p>亲!已经到底了哦</p>
            </div>
    </div> 
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import search from "@/components/common/search";
import isTop from "@/components/Common/isTop";
import vueSeamlessScroll from 'vue-seamless-scroll';/*公告栏插件*/

export default {
    data:function(){
        return{
            isShow:false,
            number:0,
            count:1,/*上拉时加载获取数据*/
            backTop:false,/*回顶组件显示切换*/
            bottomTips:false,/*底部加载完成组件切换*/
            scrollPosition:0,/*页面滚动的距离*/
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay:{
                    delay:5000
                }
            },
            swiperSlides:[],
            notice:[{id:0,title:""}],
            newArrival:[],
            hostSale:[]

        }
    },
    components:{
        swiper,
        swiperSlide,
        search,
        isTop,
        vueSeamlessScroll
    },
    computed: {
        text() {
            return {
                id: this.number,
                val: this.notice[this.number].title
            }
        }
    },
    created() {
        
        //轮播图数据
        this.getSwiperSlides();

        //公告框数据
        this.getNotice();

        //新品专区数据
        this.getNewArrival();
        
        //热卖专区数据
        this.getHostSale();

        this.$nextTick(function(){
            this.isShow = true;
        })

    },
    mounted() {
         window.addEventListener("scroll",this.handleScroll,false);
         this.startMove();
    },
    methods:{
        startMove() {
            var _this = this;
            let timer = setTimeout(()=> {
                if(_this.number === 1) {
                    _this.number = 0;
                } else {
                    _this.number += 1;
                }
                _this.startMove();
            },5000);
        },
        handleScroll(){

            this.scrollPosition = window.scrollY;

            if(window.scrollY > 500){
                /*显示回顶组件*/
                this.backTop = true;

                if(window.scrollY+window.innerHeight == document.documentElement.scrollHeight){
                        console.log("滚动到底了");

                        this.count+=1;
                        this.getHostSale();
                        /*显示底部加载完成组件*/
                        this.bottomTips = true;
                }

            }else{
                this.backTop = false;
            }
        },
        returnTop(){
                 var returnTop = setInterval(()=>{
                    if(document.documentElement.scrollTop <= 0){
                        clearInterval(returnTop);
                     }
                    document.documentElement.scrollTop -= 500 ;
                 },300)
                 
                },
        getHostSale(){

            var _this = this;

            var url = "https://www.dshui.cc/adwap/loadAdsByPadid?padid=6&pageNo=" + this.count + "&token=";

            this.$axios.get(url).then(hostSale => {
            
                    var newArr = _this.hostSale.concat(hostSale.data.data);
                    _this.hostSale = newArr;              
            })
        },
        getNewArrival(){
            var _this = this;
            var url = "https://www.dshui.cc/adwap/loadAds?adids=1%7C2%7C3%7C4%7C5&token=";
            this.$axios.get(url).then(newArrival => {
                 _this.newArrival = newArrival.data.data;
            })
        },
        getNotice(){
            var _this = this;
            var url = "https://www.dshui.cc/newswap/listNewsTops?&token=";
            this.$axios.get(url).then(function(notice) {
                _this.notice = notice.data.data;
                
            });
        },
        getSwiperSlides(){
            var _this = this;
            var url = "https://www.dshui.cc/adwap/listAllAdSlide?platform=wap&token=";
            this.$axios.get(url).then(swiper => {
                _this.swiperSlides = swiper.data.data;
            });
        },
    },
    activated() {   
        if(this.scrollPosition > 0){
            // window.scrollTo(0,this.scrollPosition);
            this.scrollPosition = 0;
            window.addEventListener("scroll", this.handleScroll, false);
        }
    },
    deactivated() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}
</script>
<style scoped>
        .slide-enter-active,
        .slide-leave-active {
            transition: all 1.3s ease;
        }

        .slide-leave-to {
            transform: translateY(-10px);
            opacity: 0;
        }

        .slide-enter {
            transform: translateY(10px);
            opacity:0;
        }
    .home{
        width:100%;
        height:100%;
        box-sizing:border-box;
        overflow:hidden;
    } 
    .searchBox {
        width:100%;
        height:0.9rem;
        display:flex;
        justify-content:space-between;
        align-items: center;
        padding: 0 0.5rem;
        box-sizing:border-box;
        box-sizing:border-box;
        position: relative;
    }

    .searchI{
        position:absolute;
        left:0.6rem;

    }

    .searchBox>input {
        width: 80%;
        height: 70%;
        border-style: none;
        background-color:whitesmoke;
        border-radius:10px;
        padding-left:0.5rem;
        box-sizing:border-box;
    }

    .searchBox>span {
        font-size:0.33rem;
        color:black;
    }
   

    .swiper{
        width:100%;
    }
    .swiper img{
        width:100%;
        height:100%;
    }
    .notice{
        width:100%;
        height:1rem;
        font-size:0.33rem;
        display:flex;
        justify-content: flex-start;
        align-items:center;
        background:whitesmoke;
    }
    .notice>span{
        width:25%;
        font-weight:bold;
        display:flex;
        justify-content:flex-end;
        align-items:center;
        box-sizing:border-box;
        padding-right:10px;
        border-right:1px solid gray;
    }
    .notice .text-container{
        width:75%;
        height:100%;
        box-sizing:border-box;
        padding-left:20px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .notice_list{
        width:100%;
        overflow:hidden;
        white-space:nowrap;
        display:block;
        text-overflow:ellipsis;
    }
     .newArrival{
          width:100%;
     }
     .newArrival>ul>li{
         display: flex;
         flex-direction:column;
         justify-content: flex-start;
         width:100%;
         overflow: hidden;
     }

     .newArrival>ul>li:nth-child(1),
     .newArrival>ul>li:nth-child(2),
     .newArrival>ul>li:nth-child(3){
         display:inline;
         box-sizing:border-box;
     }
     .newArrival>ul>li:nth-child(1)>img,
     .newArrival>ul>li:nth-child(2)>img,
     .newArrival>ul>li:nth-child(3)>img
    {
         height:150px;
         width:33%; 
         flex:1;
     }

     .newArrival>ul>li>div{
         width:100%;
         padding:10px;
         box-sizing:border-box;
         display:flex;
         flex-direction:column;
         justify-content:flex-start;
         align-items:flex-start;
         margin-bottom:5px;
         box-shadow:0 0 1px gray;

     }
      .newArrival>ul>li>div>img{
         width:100%;
         height:100%;
     }
     .newArrTitle{
         font-weight:bold;
         font-size:0.35rem;
         color:black;
     }
     .newArrSub{
         font-size:0.3rem;
         margin:10px 0 10px 0;
     }

     .hostSale{
         width:100%;
         box-sizing:border-box;
     }
     .hostSale .tips{
         font-size:0.4rem;
         color:black;
         font-weight:bold;
         margin:0.32rem;
     }

     .hostList{
         width:100%;
         padding:10px;
         display:flex;
         flex-direction:column;
         justify-content:flex-start;
         align-items:flex-start;
         box-sizing:border-box;
         box-shadow:0px 0.5px gray;
     }

     .hostList>img{
         width:100%;
         margin-bottom:0.26rem;
     }
     .bottomTips{
         width:100%;
         height:0.64rem;
         background-color:lavenderblush;
         font-size:0.34rem;
         color:rebeccapurple;
         display:flex;
         justify-content:center;
         align-items:center;
     }
</style>
